📊 Smart Attendance Manager

A modern Smart Attendance Management System built with a clean UI and powerful frontend architecture using React, TypeScript, and Vite.

🔗 Live Demo: https://smart-attendance-manager-gamma.vercel.app/

🔗 GitHub Repo: https://github.com/perugukondaiah1769-blip/smart-attendance-manager.git

🚀 Overview
8
Smart Attendance Manager is a frontend-driven web application designed to manage and visualize attendance efficiently.

It provides:

A clean dashboard interface
User-friendly attendance tracking
Data visualization for insights

This project focuses on UI/UX + scalable frontend architecture, making it ideal for real-world integration with backend systems.

✨ Features

👤 User Side

Mark attendance (Check-in / Check-out UI)
View attendance records
Interactive calendar/date selection
Clean and responsive interface

🧑‍💼 Admin Dashboard

Attendance overview dashboard
Data visualization using charts
User attendance tracking
Filter and analyze records

📊 UI & Experience

Modern component-based UI
Responsive design (mobile + desktop)
Toast notifications (via Sonner)
Smooth animations

🛠️ Tech Stack

Frontend

React 18
TypeScript
Vite

UI & Styling

Tailwind CSS
shadcn/ui
Radix UI Components
Lucide Icons
State & Data Handling
React Query (@tanstack/react-query)
React Hook Form
Zod (Validation)

Charts & Visualization

Recharts

Testing

Vitest
Testing Library
Playwright

📂 Project Structure

smart-attendance-manager/

│
├── public/                # Static assets
├── src/
│   ├── components/        # Reusable UI components
│   ├── pages/             # Application pages (Dashboard, etc.)
│   ├── hooks/             # Custom React hooks
│   ├── data/              # Mock / static data
│   ├── lib/               # Utility functions
│   ├── types/             # TypeScript types
│   ├── App.tsx            # Main app component
│   └── main.tsx           # Entry point
│
├── index.html
├── package.json
├── tailwind.config.ts
├── vite.config.ts
└── README.md

⚙️ Installation & Setup

1️⃣ Clone the Repository

git clone https://github.com/perugukondaiah1769-blip/smart-attendance-manager.git

cd smart-attendance-manager

2️⃣ Install Dependencies

npm install

3️⃣ Run Development Server

npm run dev

4️⃣ Open in Browser

http://localhost:5173

🧪 Testing

Run unit tests:

npm run test

Run in watch mode:

npm run test:watch

🏗️ Build for Production

npm run build

Preview build:

npm run preview

📊 Key Libraries Used

@tanstack/react-query → Data fetching & caching
react-hook-form → Form handling
zod → Schema validation
recharts → Charts & analytics
sonner → Toast notifications
radix-ui → Accessible UI primitives

🌐 Deployment

This project is deployed on Vercel:

👉 http:smart-attendance-manager-gamma.vercel.app

🔒 Future Enhancements

Backend integration (Node.js / Firebase / Supabase)
Authentication system (JWT / OAuth)
Real database (MongoDB / PostgreSQL)
Face recognition attendance
QR code-based attendance
Role-based access control

🤝 Contributing

Contributions are welcome!

Fork the repository
Create a branch (feature/new-feature)
Commit changes
Push and create a Pull Request

👨‍💻 Author
Kondaiah

GitHub: https://github.com/perugukondaiah1769-blip

⭐ Support

If you like this project, give it a ⭐ on GitHub!

💡 Note

This project currently uses mock/static data for demonstration. It is designed to be easily extended with a backend.
