# 🕒 Timesheet Management App

A simple timesheet tracking app built using **React**, **TypeScript**, and **Tailwind CSS**. This app allows users to log their daily work hours, track weekly progress, and manage project tasks in a clean and intuitive interface.

---

## 🚀 Features

- 🔐 **Login system** (mocked with local JSON users)
- 📅 **Dashboard** view with timesheet summaries
- 📝 **List page** to add, view, and manage tasks by date
- 📊 **Progress bar** showing total weekly hours
- 🧭 **Navigation** between Dashboard and List pages
- 💾 Data stored and retrieved from mock JSON (`entries.json`)
- 📆 Navigate **previous/next week** and show current week range
- ⚙️ Responsive design with **Tailwind CSS**

---

## 📦 Tech Stack

- **React**
- **TypeScript**
- **Tailwind CSS**
- **React Router**
- **Mock JSON API (local only)**

---

## 🚀 Online Demo

[Click here to view the live demo](https://vercel.com/oms-projects-6857f81a/timesheet)

---

## ⚙️ Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/OmBhagat03/Timesheet.git
   cd Timesheet
   npm install
   npm start

Demo Credentials
Email: om@gmail.com
Password: password

Assumptions / Notes

    The app uses mock JSON files (entries.json, users.json, timesheets.json) instead of a real backend.

    Login is validated using data from users.json.

    Tasks are added and stored locally. Refreshing reflects latest saved entries.

    The date range and week shifting are implemented using JavaScript date manipulation.

Time Spent

    Total Time: ~12–14 hours

        Setup & Structure: 1 hrs

        Login + Routing: 2 hr

        Dashboard: 1.5 hrs

        List Page + Grouping: 2.5 hrs

        Task Modal + Add Task: 2.5 hrs

        Week Navigation + Data Handling: 2 hrs

        Styling with Tailwind: 1 hrs

        Debugging + Cleanup + README: 1 hrs