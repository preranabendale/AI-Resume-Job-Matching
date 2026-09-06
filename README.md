# AI Resume & Job Matching Platform

An AI-powered full-stack web application that helps job seekers analyze their resumes, improve ATS compatibility, and discover relevant job opportunities.

The platform also allows recruiters to register, post jobs, and manage their job postings.

---

## 🚀 Project Overview

AI Resume & Job Matching is a MERN stack based career platform designed to simplify the recruitment process.

Job seekers can upload their resume in PDF format. The system extracts the resume text and uses AI to analyze the resume and generate:

- ATS Score
- Detected Technical Skills
- Resume Strengths
- Missing Skills
- AI-based Suggestions
- Score Breakdown

Recruiters can create job postings by providing job details such as title, company, location, salary, job type, description, and required skills.

The application uses JWT authentication and role-based access control to provide different functionality for Job Seekers and Recruiters.

---

## 🎯 Objectives

The main objectives of this project are:

- Analyze resumes using Artificial Intelligence.
- Calculate ATS compatibility score.
- Identify technical skills from resumes.
- Suggest missing skills and improvements.
- Help job seekers improve their resumes.
- Allow recruiters to post job opportunities.
- Provide a centralized platform for job seekers and recruiters.
- Implement secure authentication and role-based authorization.

---

## ✨ Features

### 👤 Authentication

- User Registration
- User Login
- JWT-based Authentication
- Protected Routes
- Role-based Authorization

### 📄 Resume Analysis

Job seekers can upload their resume in PDF format.

The system:

1. Accepts the PDF resume.
2. Extracts text from the PDF.
3. Sends the resume content to an AI model.
4. AI analyzes the resume.
5. Generates a structured resume analysis.
6. Stores the analysis in MongoDB.
7. Displays the results on the frontend.

### 🤖 AI Resume Analysis

The AI provides:

- Overall ATS Score
- Detected Skills
- Resume Strengths
- Missing Skills
- Improvement Suggestions
- Technical Skills Score
- ATS Compatibility Score
- Resume Structure Score
- Content Quality Score

### 💼 Job Management

Recruiters can:

- Post new jobs
- Add job title
- Add company name
- Add location
- Add salary
- Select job type
- Add job description
- Add required skills
- View their posted jobs

Job seekers can:

- View available jobs
- Search and explore job opportunities

### 📊 Dashboard

The application provides a dashboard for users based on their role.

Recruiter dashboard includes:

- Total Jobs
- Candidates
- Resumes
- AI Accuracy
- Posted Jobs
- Quick Actions

### 🎨 Responsive UI

The frontend is designed with:

- Responsive layout
- Modern cards
- Navigation bar
- Dashboard
- Forms
- Professional UI
- Mobile-friendly design

---

## 🛠️ Technologies Used

### Frontend

- React.js
- Vite
- React Router DOM
- Tailwind CSS
- Axios
- React Icons

### Backend

- Node.js
- Express.js
- REST API
- JWT Authentication
- Multer
- PDF Parse

### Database

- MongoDB
- Mongoose

### AI Integration

- OpenRouter API
- AI-powered Resume Analysis

### Development Tools

- VS Code
- Git
- GitHub
- Postman

---

## 🏗️ Project Architecture

```text
AI-Resume-Job-Matching
│
├── client
│   │
│   ├── src
│   │   ├── components
│   │   │   ├── layout
│   │   │   └── common
│   │   │
│   │   ├── pages
│   │   │   ├── public
│   │   │   ├── auth
│   │   │   ├── seeker
│   │   │   └── recruiter
│   │   │
│   │   ├── routes
│   │   ├── services
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
├── server
│   │
│   ├── config
│   │
│   ├── controllers
│   │
│   ├── middleware
│   │
│   ├── models
│   │
│   ├── routes
│   │
│   ├── services
│   │
│   ├── index.js
│   └── package.json
│
├── .gitignore
└── README.md
