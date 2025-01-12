# HealthHub - Comprehensive Healthcare Solution

HealthHub is a full-stack healthcare management platform designed to streamline medical services, document management, and appointment scheduling. It includes features like exercise tracking, eKYC verification, and dashboards for different user roles (patients, doctors, hospitals, labs, and medical stores).

## Features

- **Exercise Tracker**: Real-time exercise monitoring with pose detection and feedback.
- **eKYC Verification**: Secure identity verification for users.
- **Appointment Booking**: Easy scheduling of doctor appointments.
- **MediClaim Services**: Digital documentation and verification for medical claims.
- **Dashboards**: Custom dashboards for patients, doctors, hospitals, labs, and medical stores.
- **Contact Management**: Secure messaging and support system.
- **Company Registration**: Onboarding for healthcare providers and organizations.

## Technologies Used

- **Frontend**: React, TypeScript, TailwindCSS, Vite
- **Backend**: Node.js, Express, MongoDB
- **Exercise Tracker**: Flask, Mediapipe, OpenCV
- **Authentication**: JWT (JSON Web Tokens)
- **Styling**: TailwindCSS, GSAP for animations
- **PDF Generation**: PDFKit

## Directory Structure

``` Code
└── navneet1206-game_changers_hackverse/
├── eslint.config.js
├── index.html
├── postcss.config.js
├── tailwind.config.js
├── vite.config.ts
├── Exercise Tracker model/
│ ├── app.py
│ ├── exercise_analyzer.py
│ ├── index.py
│ ├── requirements.txt
│ ├── wsgi.py
│ ├── .gitignore
│ ├── static/
│ │ ├── script.js
│ │ └── style.css
│ └── templates/
│ └── index.html
├── server/
│ ├── index.js
│ └── uploads/
└── src/
├── App.tsx
├── index.css
├── main.tsx
├── vite-env.d.ts
├── components/
│ ├── BookAppointmentPopup.tsx
│ ├── Features.tsx
│ ├── Footer.tsx
│ ├── Hero3D.tsx
│ └── Navbar.tsx
├── contexts/
│ └── AuthContext.tsx
└── pages/
├── About.tsx
├── CompanyRegistration.tsx
├── Contact.tsx
├── Ekyc.tsx
├── Home.tsx
├── Hospitals.tsx
├── Login.tsx
├── MediClaim.tsx
├── NotFound.tsx
└── dashboards/
├── DoctorDashboard.tsx
├── HospitalDashboard.tsx
├── LabDashboard.tsx
├── PatientDashboard.tsx
└── StoreDashboard.tsx
```


## How to Run the Code

### Prerequisites

- Node.js (v16 or higher)
- Python (v3.8 or higher)
- MongoDB (running locally or remotely)
- npm or yarn

### Step 1: Clone the Repository

```bash
git clone https://github.com/navneet1206/navneet1206-game_changers_hackverse.git
cd navneet1206-game_changers_hackverse
```
