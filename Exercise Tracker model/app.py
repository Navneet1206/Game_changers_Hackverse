from flask import Flask, render_template, Response, jsonify
import cv2
from exercise_analyzer import ExerciseAnalyzer
import logging

app = Flask(__name__)

# Initialize video capture and exercise analyzer
try:
    video_capture = cv2.VideoCapture(0)  # Open default camera
    if not video_capture.isOpened():
        raise RuntimeError("Could not open camera. Please check if the camera is connected.")
except Exception as e:
    logging.error(f"Error initializing camera: {e}")
    video_capture = None

analyzer = ExerciseAnalyzer()

@app.route("/")
def index():
    return render_template("index.html")

def generate_frames():
    while True:
        if video_capture is None:
            logging.error("Camera not initialized. Cannot generate frames.")
            break

        success, frame = video_capture.read()
        if not success:
            logging.error("Failed to read frame from camera.")
            break

        # Analyze frame for exercise
        frame, exercise_data, feedback = analyzer.process_frame(frame)

        # Encode frame for live streaming
        _, buffer = cv2.imencode('.jpg', frame)
        frame = buffer.tobytes()

        # Yield frame in byte format for video streaming
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

@app.route("/video_feed")
def video_feed():
    if video_capture is None:
        return "Camera not initialized. Please check your camera connection.", 500
    return Response(generate_frames(), mimetype="multipart/x-mixed-replace; boundary=frame")

@app.route("/data")
def get_data():
    return jsonify(analyzer.get_exercise_data())

@app.route("/reset", methods=["POST"])
def reset_data():
    # Reset the exercise data in the analyzer
    analyzer.exercise_data = {
        "pushups": 0,
        "squats": 0,
        "jumping_jacks": 0,
        "planks": 0,
    }
    analyzer.states = {
        "pushup": None,
        "squat": None,
        "jumping_jack": None,
        "plank": None,
    }
    return jsonify({"status": "success", "message": "Exercise data reset successfully."})

# if __name__ == "__main__":
#     app.run(debug=True)