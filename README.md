# 🚀 CodeSmith InfoSoft LLP – IT Company Website Backend

A dynamic and scalable backend built with **Node.js**, **Express.js**, and **MongoDB**, designed to power the official website of **CodeSmith InfoSoft**. This API-driven architecture supports multiple modules such as blogs, careers, portfolios, authentication, and email integration using Nodemailer.

---

## 🔍 Project Overview

This project serves as the backend for CodeSmith InfoSoft, an IT service company. It provides RESTful APIs for website modules such as:
- Blogs
- Careers
- About Us
- Case Studies
- Contact Forms
- Testimonials
- Tech Stack
- Gallery
- Admin Auth
- And more...

All endpoints include request validation, error handling, and MongoDB integration.

---

## ✨ Key Features
- ✅ Admin Authentication (JWT-based)
- 📰 Blog & Case Study Management
- 📩 Contact Form with Nodemailer
- 💼 Career Opportunities
- 📸 Gallery Uploads with Multer
- 🧾 Tech Stack & Services Info
- 📦 RESTful APIs with Proper Validation (using Joi)
- 🔒 Secured with JWT and Bcrypt
- 📁 File Upload Support
- 📄 Consistent Response Format

---

## 🧰 Technology Stack
- **Node.js** – JavaScript runtime
- **Express.js** – Web framework
- **MongoDB + Mongoose** – NoSQL database & ODM
- **Nodemailer** – Email service
- **Multer** – File uploads
- **Joi** – Request validation
- **JWT & Bcrypt** – Authentication & password hashing
- **dotenv** – Environment variable management

---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
# Clone the repository
git clone https://github.com/mihirkasodariya/code-smith-info-soft-node.js.git
# Navigate into the project directory
cd code-smith-info-soft-node.js

# Install dependencies
npm install

# For development
npm run dev
```

## Environment Configuration
PORT = 5000
MONGOURL = ""
JWT_SECRET = ""

### SMTP CREDENTIALS
MAIL_SERVICE = ""
FROM_MAIL = ""
SMTP_HOST= "smtp.gmail.com"
SMTP_PORT = 587
SMTP_SECURE = 
SMTP_USERNAME = ""
SMTP_PASSWORD = ""
BASE_URL = ""