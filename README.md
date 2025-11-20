User Management Application

A modern, responsive CRUD (Create, Read, Update, Delete) application built with React and Vite for managing user data. This application demonstrates proficiency in React development, API integration, and modern web development practices.


🌟 Live Demo
[Live Demo URL] - (https://user-management-app-coral-pi.vercel.app/)


✨ Features
Core Functionality
View Users: Display all users in an intuitive card-based layout
Create Users: Add new users with comprehensive form validation
Update Users: Edit existing user information with pre-filled forms
Delete Users: Remove users with confirmation prompts
View Details: Detailed view for each user with complete information
Technical Features
✅ React functional components with Hooks (useState, useEffect)
✅ React Router for seamless navigation
✅ Responsive design (mobile and desktop)
✅ Loading states with spinner animations
✅ Error handling with user-friendly messages
✅ Form validation
✅ Success/Error notifications
✅ Clean and commented code
✅ RESTful API integration
🛠️ Technologies Used
React 18 - JavaScript library for building user interfaces
Vite - Next generation frontend tooling
React Router v6 - Declarative routing for React
Axios - Promise-based HTTP client (optional, fetch API used)
CSS3 - Modern styling with responsive design
JSONPlaceholder API - Fake REST API for testing
📁 Project Structure
text

user-management-app/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── UserList.jsx        # Display users grid
│   │   ├── UserList.css        
│   │   ├── UserForm.jsx        # Create/Edit user form
│   │   ├── UserForm.css        
│   │   ├── UserDetail.jsx      # User details view
│   │   ├── UserDetail.css      
│   │   ├── Navbar.jsx          # Navigation component
│   │   ├── Navbar.css          
│   │   ├── LoadingSpinner.jsx  # Loading indicator
│   │   └── LoadingSpinner.css  
│   ├── services/
│   │   └── api.js              # API service layer
│   ├── App.jsx                 # Main application component
│   ├── App.css                 # Global styles
│   ├── main.jsx               # Application entry point
│   └── index.css              # Base styles
├── .gitignore
├── package.json
├── vite.config.js
├── README.md
└── index.html






📋 API Endpoints Used
All API endpoints are from JSONPlaceholder

Method	Endpoint	Description
GET	/users	Fetch all users
GET	/users/{id}	Fetch single user
POST	/users	Create new user
PUT	/users/{id}	Update user
DELETE	/users/{id}	Delete user


Note: JSONPlaceholder is a fake API, so POST, PUT, and DELETE operations don't actually modify server data but return appropriate responses for testing.