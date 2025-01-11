import cv2
import mediapipe as mp
import numpy as np
from filterpy.kalman import KalmanFilter

class ExerciseAnalyzer:
    def __init__(self):
        self.pose = mp.solutions.pose.Pose(min_detection_confidence=0.5, min_tracking_confidence=0.5)
        self.mp_drawing = mp.solutions.drawing_utils
        self.exercise_data = {
            "pushups": 0,
            "squats": 0,
            "jumping_jacks": 0,
            "planks": 0,
        }
        self.states = {
            "pushup": None,
            "squat": None,
            "jumping_jack": None,
            "plank": None,
        }
        self.kalman_filters = {}

    def process_frame(self, frame):
        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = self.pose.process(rgb_frame)
        feedback = []

        if results.pose_landmarks:
            self.mp_drawing.draw_landmarks(
                frame, results.pose_landmarks, mp.solutions.pose.POSE_CONNECTIONS
            )
            landmarks = results.pose_landmarks.landmark
            self._smooth_landmarks(landmarks)
            self._analyze_pushups(landmarks, feedback)
            self._analyze_squats(landmarks, feedback)
            self._analyze_jumping_jacks(landmarks, feedback)
            self._analyze_planks(landmarks, feedback)

        return frame, self.exercise_data, feedback

    def _smooth_landmarks(self, landmarks):
        """ Apply Kalman Filter to smooth landmark positions. """
        for idx, landmark in enumerate(landmarks):
            if idx not in self.kalman_filters:
                self.kalman_filters[idx] = self._create_kalman_filter()
            kf = self.kalman_filters[idx]
            kf.predict()
            kf.update(np.array([landmark.x, landmark.y], dtype=np.float32))
            # Convert Kalman filter state to float
            landmark.x = float(kf.x[0])
            landmark.y = float(kf.x[1])

    def _create_kalman_filter(self):
        """ Create a Kalman Filter for 2D position tracking. """
        kf = KalmanFilter(dim_x=4, dim_z=2)
        kf.F = np.array([[1, 0, 1, 0],
                         [0, 1, 0, 1],
                         [0, 0, 1, 0],
                         [0, 0, 0, 1]])
        kf.H = np.array([[1, 0, 0, 0],
                         [0, 1, 0, 0]])
        kf.P *= 1000
        kf.R = np.array([[5, 0],
                         [0, 5]])
        kf.Q = np.eye(4) * 0.1
        return kf

    def _analyze_pushups(self, landmarks, feedback):
        """ Analyze elbow and shoulder angle for pushups. """
        left_shoulder = landmarks[mp.solutions.pose.PoseLandmark.LEFT_SHOULDER.value]
        left_elbow = landmarks[mp.solutions.pose.PoseLandmark.LEFT_ELBOW.value]
        left_wrist = landmarks[mp.solutions.pose.PoseLandmark.LEFT_WRIST.value]

        angle = self._calculate_angle(left_shoulder, left_elbow, left_wrist)

        if angle > 160:  # Arms straight
            if self.states["pushup"] == "down":
                self.exercise_data["pushups"] += 1
                feedback.append("Pushup completed!")
            self.states["pushup"] = "up"
        elif angle < 90:  # Arms bent
            self.states["pushup"] = "down"

    def _analyze_squats(self, landmarks, feedback):
        """ Analyze hip and knee angles for squats. """
        left_hip = landmarks[mp.solutions.pose.PoseLandmark.LEFT_HIP.value]
        left_knee = landmarks[mp.solutions.pose.PoseLandmark.LEFT_KNEE.value]
        left_ankle = landmarks[mp.solutions.pose.PoseLandmark.LEFT_ANKLE.value]

        hip_knee_angle = self._calculate_angle(left_hip, left_knee, left_ankle)

        if hip_knee_angle > 160:  # Standing
            self.states["squat"] = "up"
        elif hip_knee_angle < 90 and self.states["squat"] == "up":  # Squatting
            self.states["squat"] = "down"
            self.exercise_data["squats"] += 1
            feedback.append("Squat completed!")

    def _analyze_jumping_jacks(self, landmarks, feedback):
        """ Analyze arm and leg positions for jumping jacks. """
        left_shoulder = landmarks[mp.solutions.pose.PoseLandmark.LEFT_SHOULDER.value]
        left_hip = landmarks[mp.solutions.pose.PoseLandmark.LEFT_HIP.value]
        left_wrist = landmarks[mp.solutions.pose.PoseLandmark.LEFT_WRIST.value]
        left_ankle = landmarks[mp.solutions.pose.PoseLandmark.LEFT_ANKLE.value]
        left_knee = landmarks[mp.solutions.pose.PoseLandmark.LEFT_KNEE.value]  # Define left_knee

        arm_angle = self._calculate_angle(left_shoulder, left_hip, left_wrist)
        leg_angle = self._calculate_angle(left_hip, left_knee, left_ankle)  # Use left_knee here

        if arm_angle > 150 and leg_angle > 150:  # Arms and legs spread
            if self.states["jumping_jack"] == "closed":
                self.exercise_data["jumping_jacks"] += 1
                feedback.append("Jumping jack completed!")
            self.states["jumping_jack"] = "open"
        elif arm_angle < 90 and leg_angle < 90:  # Arms and legs closed
            self.states["jumping_jack"] = "closed"

    def _analyze_planks(self, landmarks, feedback):
        """ Analyze body alignment for planks. """
        left_shoulder = landmarks[mp.solutions.pose.PoseLandmark.LEFT_SHOULDER.value]
        left_hip = landmarks[mp.solutions.pose.PoseLandmark.LEFT_HIP.value]
        left_ankle = landmarks[mp.solutions.pose.PoseLandmark.LEFT_ANKLE.value]

        body_angle = self._calculate_angle(left_shoulder, left_hip, left_ankle)

        if 160 < body_angle < 200:  # Body straight
            self.states["plank"] = "correct"
            feedback.append("Plank form is correct!")
        else:
            self.states["plank"] = "incorrect"
            feedback.append("Plank form is incorrect. Straighten your body.")

    def _calculate_angle(self, point1, point2, point3):
        """ Calculate the angle between three points using vector mathematics. """
        a = np.array([point1.x, point1.y])
        b = np.array([point2.x, point2.y])
        c = np.array([point3.x, point3.y])

        ba = a - b
        bc = c - b

        cosine_angle = np.dot(ba, bc) / (np.linalg.norm(ba) * np.linalg.norm(bc))
        angle = np.arccos(cosine_angle) * 180 / np.pi
        return angle

    def get_exercise_data(self):
        return self.exercise_data