# 🚀 AIVault

A powerful, full-stack AI application designed to streamline content creation and enhance your professional profile. Built with a modern React frontend and a robust Node.js backend, AIVault leverages the power of Google's Gemini AI to generate articles, craft blog titles, create engaging social media posts, and perform expert resume reviews.

## ✨ Features

- **📝 Write Articles:** Generate high-quality, comprehensive articles based on your prompts and desired word counts.
- **💡 Blog Titles Generator:** Instantly get 5 catchy, SEO-friendly titles for your next blog post.
- **📱 Social Media Post Generator:** Create highly-shareable content tailored for specific social media platforms, complete with relevant hashtags and emojis.
- **📄 Resume Reviewer (ATS):** Upload your resume (PDF) and get an expert ATS compatibility score, along with strengths, weaknesses, missing keywords, and an improved professional summary.
- **🔐 Secure Authentication:** Seamless and secure user login and registration powered by Clerk.
- **📚 Creation History:** View and manage your past AI creations, securely stored in a PostgreSQL database.

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 19 with Vite
- **Styling:** Tailwind CSS v4
- **Routing:** React Router v7
- **Authentication:** Clerk React
- **Icons:** Lucide React
- **Rendering:** React Markdown

### Backend
- **Framework:** Node.js with Express.js
- **AI Integration:** Google Gen AI (`gemini-3-flash-preview`)
- **Database:** PostgreSQL (via Neon Serverless)
- **Authentication:** Clerk Express Middleware
- **File Handling:** Multer & PDF.js (for parsing resume PDFs)

## 🚀 Getting Started

Follow these instructions to set up the project locally.

### Prerequisites
- Node.js installed on your machine.
- A [Clerk](https://clerk.com/) account for authentication.
- A [Google Gemini API](https://ai.google.dev/) key.
- A [Neon](https://neon.tech/) PostgreSQL database (or any PostgreSQL instance).

## 📁 Project Structure


AIVault/
├── Client/                 # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── pages/          # React Pages (Home, Dashboard, etc.)
│   │   ├── App.jsx         # Main App Component & Routing
│   │   └── ...
│   ├── package.json
│   └── vite.config.js
├── server/                 # Express Backend
│   ├── configs/            # Database configs
│   ├── controllers/        # Route controllers (AI, Users)
│   ├── routes/             # Express routes
│   ├── server.js           # Entry point
│   └── package.json
└── README.md               # You are here!


## 🤝 Contributing

Contributions, issues, and feature requests are welcome!


