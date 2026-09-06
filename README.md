# AI Resume & Job Matching

A MERN Stack project that uses AI to analyze resumes, provide ATS scores and suggestions, and manage job opportunities.

## Project Structure

AI-Resume-Job-Matching/
│
├── client/                 # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Home, Login, Resume, Jobs, Dashboard
│   │   ├── routes/        # Application routes
│   │   └── services/      # API configuration
│   └── package.json
│
├── server/                # Backend (Node + Express)
│   ├── config/            # Database configuration
│   ├── controllers/       # Business logic
│   ├── middleware/        # Authentication & file upload
│   ├── models/            # MongoDB schemas
│   ├── routes/            # API routes
│   ├── services/          # AI/OpenRouter service
│   ├── index.js           # Server entry point
│   └── package.json
│
└── README.md              # Project documentation

## Main Features

- User Login & Registration
- Resume Upload
- AI Resume Analysis
- ATS Score & Suggestions
- Job Posting
- Job Search
- Recruiter & Seeker Dashboard

## Tech Stack

React.js • Node.js • Express.js • MongoDB • Tailwind CSS • JWT • OpenRouter AI
