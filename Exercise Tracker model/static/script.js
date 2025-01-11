document.addEventListener("DOMContentLoaded", () => {
    const goalForm = document.getElementById("goal-form");
    const goalSelect = document.getElementById("goal-select");
    const goalSuggestions = document.getElementById("goal-suggestions");
    const exerciseSuggestions = document.getElementById("exercise-suggestions");
    const dailyRepsInput = document.getElementById("daily-reps");
    const setGoalButton = document.getElementById("set-goal-button");

    // Exercise suggestions based on goal
    const exerciseData = {
        chest: [
            { name: "Pushups", description: "Targets chest, shoulders, and triceps." },
            { name: "Chest Press", description: "Targets chest and shoulders." }
        ],
        legs: [
            { name: "Squats", description: "Builds leg strength." },
            { name: "Lunges", description: "Strengthens legs and glutes." }
        ],
        "full-body": [
            { name: "Burpees", description: "Full body workout." },
            { name: "Jumping Jacks", description: "Cardio full-body exercise." }
        ],
        core: [
            { name: "Planks", description: "Strengthens the core." },
            { name: "Russian Twists", description: "Targets obliques and core." }
        ]
    };

    // Show exercises based on goal
    goalForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const goal = goalSelect.value;

        if (goal) {
            goalSuggestions.style.display = 'block';
            exerciseSuggestions.innerHTML = exerciseData[goal].map(exercise => `
                <li class="list-group-item">
                    <strong>${exercise.name}</strong> - ${exercise.description}
                </li>
            `).join('');
        }
    });

    // Handle setting the daily goal for reps
    setGoalButton.addEventListener("click", () => {
        const reps = dailyRepsInput.value;
        if (reps && reps > 0) {
            alert(`You have set your goal to ${reps} reps per day!`);
        } else {
            alert("Please enter a valid number of reps.");
        }
    });
});

// Exercise Data Handling
document.addEventListener("DOMContentLoaded", () => {
    const exerciseList = document.getElementById("exercise-data");
    const resetButton = document.getElementById("reset-button");

    // Fetch real-time exercise data
    function fetchExerciseData() {
        fetch("/data")
            .then(response => response.json())
            .then(data => {
                exerciseList.innerHTML = Object.entries(data).map(([exercise, count]) => `
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        <div class="d-flex align-items-center">
                            ${exercise.charAt(0).toUpperCase() + exercise.slice(1)}
                        </div>
                        <span class="badge bg-primary rounded-pill">${count}</span>
                    </li>
                `).join('');
            });
    }

    // Reset exercise data
    resetButton.addEventListener("click", () => {
        fetch("/reset", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === "success") {
                fetchExerciseData(); // Refresh the exercise data
                alert("Exercise counts have been reset!");
            }
        })
        .catch(error => {
            console.error("Error resetting data:", error);
        });
    });

    // Refresh exercise data every second
    setInterval(fetchExerciseData, 1000);
});

// GSAP Animations for Exercise Cards
document.addEventListener("DOMContentLoaded", () => {
    const exerciseCards = document.querySelectorAll(".exercise-card");

    exerciseCards.forEach((card) => {
        const smallDescription = card.querySelector(".small-description");
        const fullDescription = card.querySelector(".full-description");

        card.addEventListener("click", () => {
            if (fullDescription.style.display === "none") {
                gsap.to(fullDescription, {
                    height: "auto",
                    opacity: 1,
                    duration: 0.3,
                    ease: "power1.out",
                    onStart: () => {
                        fullDescription.style.display = "block";
                    },
                });
            } else {
                gsap.to(fullDescription, {
                    height: 0,
                    opacity: 0,
                    duration: 0.3,
                    ease: "power1.in",
                    onComplete: () => {
                        fullDescription.style.display = "none";
                    },
                });
            }
        });
    });
});

// Camera On/Off functionality
document.addEventListener("DOMContentLoaded", () => {
    const cameraButton = document.getElementById("camera-button");
    const videoFeed = document.getElementById("video-feed");
    let mediaStream;

    // Toggle camera on/off
    cameraButton.addEventListener("click", () => {
        if (mediaStream) {
            // Stop the stream and hide the video
            mediaStream.getTracks().forEach(track => track.stop());
            videoFeed.style.display = 'none';
            mediaStream = null;
            cameraButton.textContent = "Turn Camera On";
        } else {
            // Start the stream and show the video
            navigator.mediaDevices.getUserMedia({ video: true })
                .then((stream) => {
                    videoFeed.srcObject = stream;
                    videoFeed.style.display = 'block';  // Make the video element visible
                    mediaStream = stream;
                    cameraButton.textContent = "Turn Camera Off";
                })
                .catch((err) => {
                    alert("Error accessing camera: " + err.message);
                });
        }
    });
});
