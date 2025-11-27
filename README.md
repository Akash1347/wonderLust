# 🏡 WonderLust - A Full-Stack Vacation Rental Web App

<div align="center">
 

 
Welcome to **WonderLust**, a full-stack web application designed as a comprehensive 
platform for discovering, booking, and reviewing vacation rentals.  

 

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Technology Stack](#-technology-stack)
- [Architecture](#-architecture--design-patterns)
- [Skills Demonstrated](#-skills-demonstrated)
- [Project Highlights](#-project-highlights)

---

## 🌟 Overview

**WonderLust** is a comprehensive full-stack web application that replicates core functionalities of modern property rental platforms. This project demonstrates expertise in building scalable, secure, and user-friendly web applications using industry-standard technologies and design patterns.

### 🎯 Project Goals

- Build a robust property listing and booking platform
- Implement secure user authentication and authorization
- Create an intuitive, responsive user interface
- Apply professional software architecture patterns (MVC)
- Integrate third-party services (Cloud storage, Maps, Payment systems)

---

## ✨ Key Features

### 🔐 User Management
- **Secure Authentication** - Passport.js with session-based authentication
- **User Registration & Login** - Password hashing and secure credential storage
- **Authorization Middleware** - Role-based access control for listings and reviews

### 🏠 Property Listings
- **CRUD Operations** - Complete Create, Read, Update, Delete functionality
- **Image Upload** - Cloud-based image storage using Cloudinary
- **Search & Filter** - Dynamic search functionality with multiple filter options
- **Geolocation** - Interactive maps powered by Mapbox GL JS
- **Responsive Design** - Mobile-first approach with Bootstrap 5

### ⭐ Reviews & Ratings
- **Star Rating System** - Visual rating interface (1-5 stars)
- **Review Management** - Users can add, view, and delete their reviews
- **Author Verification** - Only review authors can modify their content

### 🗺️ Interactive Maps
- **Location Visualization** - Mapbox integration for property locations
- **Geocoding** - Automatic coordinate conversion from addresses
- **Custom Markers** - Styled map markers with popup information

### 📱 User Experience
- **Flash Messages** - Real-time user feedback for actions
- **Form Validation** - Client and server-side validation
- **Error Handling** - Comprehensive error management with custom error pages
- **Tax Toggle** - Optional tax display in pricing

---

## 🛠️ Technology Stack

### **Backend Technologies**

- **Node.js (v22.14.0)** - Runtime environment
- **Express.js (v5.1.0)** - Web application framework
- **MongoDB (v8.18.1)** - NoSQL database
- **Mongoose (v8.18.1)** - ODM for MongoDB

### **Authentication & Security**

- **Passport.js** - Authentication middleware
- **Passport-Local-Mongoose** - Username/password authentication
- **Express-Session** - Session management
- **Connect-Flash** - Flash message handling
- **Joi** - Data validation

### **Cloud Services & APIs**

- **Cloudinary** - Cloud-based image storage & optimization
- **Multer** - Multipart form data handling
- **Mapbox SDK** - Geocoding and mapping services

### **Frontend Technologies**

- **EJS** - Templating engine
- **Bootstrap 5** - CSS framework
- **Font Awesome** - Icon library
- **Mapbox GL JS** - Interactive maps

### **Additional Tools**

- **Method Override** - HTTP method support (PUT, DELETE)
- **EJS-Mate** - Layout support for EJS
- **Connect-Mongo** - MongoDB session store
- **dotenv** - Environment variable management

---

## 🏗️ Architecture & Design Patterns

### **MVC Architecture (Model-View-Controller)**

This project strictly follows the **MVC design pattern** for clean code organization and separation of concerns:
