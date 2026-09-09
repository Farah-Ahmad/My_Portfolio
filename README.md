# Farah Ahmad - Full Stack Developer Portfolio

A modern full-stack developer portfolio with a complete administration dashboard, built using React, Laravel, and MySQL.

The project includes a responsive public portfolio and a secure admin CMS for managing projects, screenshots, CV files, website content, contact messages, and email replies.

---

## Overview

This project was built as a complete full-stack application rather than a static portfolio.

The public website consumes data dynamically from a Laravel REST API, while the administration dashboard allows portfolio content to be managed without editing frontend code.

The application includes:

- Public developer portfolio
- Laravel REST API
- MySQL database
- Secure admin dashboard
- Dynamic projects management
- Contact message inbox
- Email reply system
- Reply history
- CV management
- Website settings
- SEO configuration
- File uploads
- Responsive design

---

# Tech Stack

## Frontend

- React
- JavaScript
- Vite
- React Router
- Axios
- Framer Motion
- CSS3

## Backend

- PHP
- Laravel
- Laravel Sanctum
- Eloquent ORM
- RESTful APIs
- Laravel Mail
- Blade Email Templates

## Database

- MySQL

## Email

- SMTP
- Gmail App Password support

---

# Project Structure

```text
My_Portfolio/
│
├── farah-portfolio/
│   ├── public/
│   ├── src/
│   │   ├── admin/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── .env.example
│   ├── package.json
│   ├── vite.config.js
│   └── README.md
│
├── farah-portfolio-api/
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/
│   │   │   │   └── Api/
│   │   │   └── Middleware/
│   │   │
│   │   ├── Mail/
│   │   ├── Models/
│   │   └── Providers/
│   │
│   ├── database/
│   │   ├── migrations/
│   │   ├── seeders/
│   │   └── factories/
│   │
│   ├── resources/
│   │   └── views/
│   │       └── emails/
│   │
│   ├── routes/
│   │   ├── api.php
│   │   ├── console.php
│   │   └── web.php
│   │
│   ├── tests/
│   ├── .env.example
│   ├── artisan
│   ├── composer.json
│   └── README.md
│
└── README.md
```

---

# Public Portfolio

The public website includes the main sections expected from a professional software developer portfolio.

## Hero

The Hero section includes:

- Developer name
- Professional title
- Developer introduction
- GitHub profile
- LinkedIn profile
- Projects call-to-action
- Dynamic CV button

The CV button is displayed only when a CV is available.

---

## About

The About section is dynamically configurable through the administration dashboard.

Content includes:

- Professional introduction
- Full-stack development focus
- Technical background
- Developer technologies

---

## Technology Stack

The portfolio presents frontend, backend, database, and software development technologies.

Main technologies used across the project include:

- React
- Vue.js
- Laravel
- Spring Boot
- MySQL
- MongoDB
- JavaScript
- PHP
- Java

---

## Projects

Projects are loaded dynamically from the Laravel API.

Each project can include:

- Project title
- Project type
- Short description
- Full description
- Technologies
- Key features
- Frontend details
- Backend details
- Database tables
- GitHub repository
- Live demo URL
- Sort order
- Visibility status
- Multiple screenshots

Projects can be managed entirely from the admin dashboard.

---

## Project Details

Each visible project has its own details page.

The page can display:

- Complete project description
- Technologies
- Features
- Frontend architecture
- Backend architecture
- Database information
- GitHub link
- Live demo link
- Screenshot gallery

The screenshot gallery includes an interactive image viewer.

Hidden projects are not accessible through the public project API.

---

## Contact

Visitors can send messages through the public contact form.

Fields include:

- Name
- Email
- Subject
- Message

Messages are stored inside the MySQL database and become available in the administration dashboard.

---

# Administration Dashboard

The project includes a protected administration system.

Admin routes require authentication and authorization.

Main administration areas include:

```text
Dashboard
Messages
Projects
CV Management
Website Settings
```

---

# Admin Authentication

Admin authentication is handled through Laravel Sanctum.

The authentication flow is:

```text
Admin Login
      ↓
Laravel Authentication
      ↓
Admin Authorization Check
      ↓
Sanctum Token Generated
      ↓
Protected Admin Dashboard
```

Protected routes use:

```text
auth:sanctum
admin
```

The backend also removes old admin tokens when a new login succeeds.

---

# Admin Dashboard

The dashboard provides an overview of portfolio activity.

It includes information such as:

- Total projects
- Total contact messages
- Read messages
- Unread messages
- Recent contact messages
- Recent projects
- Quick administration actions

---

# Contact Message Management

Messages sent through the public contact form appear inside the admin inbox.

The administration interface supports:

- View messages
- Search messages
- Filter all messages
- Filter read messages
- Filter unread messages
- Pagination
- Mark as read
- Mark as unread
- Delete messages
- Reply by email
- Reply history
- Replied status

---

# Email Reply System

The admin can reply directly to contact messages without leaving the administration dashboard.

The flow is:

```text
Visitor sends contact message
          ↓
Message stored in MySQL
          ↓
Admin opens message
          ↓
Admin selects "Reply by Email"
          ↓
Laravel Mail
          ↓
SMTP
          ↓
Email delivered to visitor
          ↓
Reply stored in reply history
```

Reply history is stored only after the email has been successfully sent.

Each stored reply includes:

- Original contact message
- Email subject
- Reply message
- Sent timestamp

---

# Projects Management

The admin dashboard provides full project CRUD functionality.

Supported operations:

- View projects
- Create projects
- Edit projects
- Delete projects
- Set project visibility
- Configure sort order
- Add technologies
- Add features
- Add frontend details
- Add backend details
- Add database tables
- Add GitHub links
- Add live demo links

---

# Project Screenshot Management

The admin can upload multiple screenshots for each project.

Supported formats include:

```text
JPG
JPEG
PNG
WebP
```

Frontend validation restricts images to a maximum of 5 MB per file.

The administration dashboard allows:

- Multiple image selection
- Image upload
- Existing screenshot preview
- Individual screenshot deletion

---

# CV Management

The CV Management module allows the administrator to manage the public portfolio CV without changing source code.

Supported actions:

- Upload CV
- Replace current CV
- View current CV
- Delete CV

CV uploads are restricted to PDF files.

The frontend validates a maximum file size of 10 MB.

---

# Website Settings

Portfolio content can be managed dynamically through the administration dashboard.

Current settings include:

- Full name
- Professional title
- Location
- Contact email
- Hero label
- Hero description
- About heading
- About text
- GitHub URL
- LinkedIn URL
- SEO title
- SEO description
- Contact form visibility
- CV button visibility

The public website loads these settings from the Laravel API.

Default values are available on the frontend if the settings API is temporarily unavailable.

---

# SEO

The portfolio includes configurable SEO information.

The administration panel can manage:

- Website title
- Meta description

The main HTML document also includes:

- Description metadata
- Author metadata
- Robots metadata
- Open Graph metadata
- Social metadata
- Theme color
- Favicon

---

# Security

The application includes several backend security measures.

## Authentication

- Laravel Sanctum authentication
- Protected admin routes
- Admin authorization middleware
- API token authentication

## Login Protection

Admin login attempts are rate limited.

```text
Maximum:
5 attempts per minute
```

## Contact Form Protection

Contact submissions are rate limited.

```text
Maximum:
5 requests per minute per IP
```

## Honeypot Protection

The contact form includes a hidden honeypot field used to help block automated spam submissions.

## Validation

Backend validation is applied to:

- Contact messages
- Admin login
- Projects
- CV uploads
- Project screenshots
- Email replies
- Website settings

## Hidden Project Protection

Projects marked as hidden are excluded from:

```text
GET /api/projects
```

and cannot be accessed through the public project details endpoint.

---

# API Routes

## Public API

```text
POST   /api/contact

GET    /api/projects
GET    /api/projects/{slug}

GET    /api/cv/current

GET    /api/settings

POST   /api/admin/login
```

---

## Protected Admin API

Authentication and admin authorization are required.

```text
GET    /api/admin/dashboard

GET    /api/admin/me
POST   /api/admin/logout
```

### Messages

```text
GET    /api/admin/messages

GET    /api/admin/messages/{contactMessage}

PATCH  /api/admin/messages/{contactMessage}/read

PATCH  /api/admin/messages/{contactMessage}/unread

POST   /api/admin/messages/{contactMessage}/reply

DELETE /api/admin/messages/{contactMessage}
```

### Projects

```text
GET    /api/admin/projects

POST   /api/admin/projects

GET    /api/admin/projects/{project}

PUT    /api/admin/projects/{project}

DELETE /api/admin/projects/{project}
```

### Project Images

```text
POST   /api/admin/projects/{project}/images

DELETE /api/admin/projects/{project}/images/{image}
```

### CV

```text
GET    /api/admin/cv

POST   /api/admin/cv

DELETE /api/admin/cv
```

### Settings

```text
GET    /api/admin/settings

PUT    /api/admin/settings
```

---

# Local Installation

## Requirements

Before running the project locally, install:

- PHP
- Composer
- Node.js
- npm
- MySQL

---

# 1. Clone the Repository

```bash
git clone https://github.com/Farah-Ahmad/My_Portfolio.git
```

Enter the project:

```bash
cd My_Portfolio
```

---

# 2. Backend Setup

Navigate to the Laravel API:

```bash
cd farah-portfolio-api
```

Install Composer dependencies:

```bash
composer install
```

Create the environment file:

```bash
cp .env.example .env
```

Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Generate the Laravel application key:

```bash
php artisan key:generate
```

---

# 3. Configure MySQL

Update the backend `.env` file:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=farah_portfolio
DB_USERNAME=root
DB_PASSWORD=
```

Create the configured database in MySQL before running migrations.

---

# 4. Configure Admin Account

Configure the initial administrator account in:

```text
farah-portfolio-api/.env
```

Example:

```env
ADMIN_NAME="Admin"
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your-secure-password
```

Never commit actual admin credentials to Git.

---

# 5. Configure Email

Email replies require SMTP configuration.

Example Gmail SMTP configuration:

```env
MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-google-app-password
MAIL_FROM_ADDRESS=your-email@gmail.com
MAIL_FROM_NAME="Portfolio"
```

When using Gmail, use a Google App Password rather than the normal Google account password.

Never commit SMTP credentials.

---

# 6. Database Migration

Run migrations:

```bash
php artisan migrate
```

Run seeders:

```bash
php artisan db:seed
```

Alternatively:

```bash
php artisan migrate:fresh --seed
```

Warning:

```text
migrate:fresh
```

deletes existing database tables and data.

---

# 7. Storage

Create the Laravel public storage link:

```bash
php artisan storage:link
```

This is required for uploaded files such as project screenshots and CV documents.

---

# 8. Start Laravel

```bash
php artisan serve
```

Default backend URL:

```text
http://127.0.0.1:8000
```

API URL:

```text
http://127.0.0.1:8000/api
```

---

# 9. Frontend Setup

Open another terminal and navigate to:

```bash
cd farah-portfolio
```

Install dependencies:

```bash
npm install
```

Create the frontend environment file:

```bash
cp .env.example .env
```

Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Configure the API:

```env
VITE_API_URL=http://127.0.0.1:8000/api
```

Start Vite:

```bash
npm run dev
```

---

# Development Workflow

The application normally runs with two development servers.

## Laravel

```bash
cd farah-portfolio-api
php artisan serve
```

## React

```bash
cd farah-portfolio
npm run dev
```

The React application communicates with Laravel through:

```env
VITE_API_URL=http://127.0.0.1:8000/api
```

---

# Frontend Commands

## Development

```bash
npm run dev
```

## ESLint

```bash
npm run lint
```

## Production Build

```bash
npm run build
```

## Preview Build

```bash
npm run preview
```

---

# Backend Commands

## Development Server

```bash
php artisan serve
```

## Routes

```bash
php artisan route:list
```

## Clear Cache

```bash
php artisan optimize:clear
```

## Migrations

```bash
php artisan migrate
```

## Seed Database

```bash
php artisan db:seed
```

## Tests

```bash
php artisan test
```

---

# Current Verification Status

The frontend currently passes ESLint successfully:

```text
0 errors
0 warnings
```

The Vite production build also completes successfully:

```text
510 modules transformed
Production build successful
```

Laravel tests currently pass:

```text
2 tests passed
0 failed
```

The existing Laravel automated tests are basic example tests and do not yet provide full feature coverage.

---

# Environment Security

Sensitive environment files are excluded from Git.

Do not commit:

```text
.env
.env.local
.env.production
.env.backup
```

Safe environment templates are included as:

```text
.env.example
```

Never store these values directly in GitHub:

- Database passwords
- Admin passwords
- Gmail passwords
- Google App Passwords
- API secrets
- Laravel production keys

---

# Responsive Design

Both the public portfolio and administration dashboard support:

- Desktop
- Laptop
- Tablet
- Mobile

Responsive layouts are implemented for:

- Navigation
- Hero
- About
- Projects
- Contact form
- Project details
- Admin sidebar
- Dashboard
- Messages
- Project forms
- CV management
- Reply modal

---

# Architecture

The application follows a separated frontend/backend architecture.

```text
React Frontend
      ↓
Axios Services
      ↓
Laravel REST API
      ↓
Controllers
      ↓
Eloquent Models
      ↓
MySQL Database
```

Admin authentication:

```text
React Admin
      ↓
Laravel API
      ↓
Sanctum
      ↓
Admin Middleware
      ↓
Protected Resources
```

---

# Main Database Entities

The application currently includes models for:

```text
User
Project
ProjectImage
ContactMessage
ContactMessageReply
CvFile
SiteSetting
```

Relationships include:

```text
Project
   └── Project Images

Contact Message
   └── Reply History
```

---

# Future Improvements

Possible future improvements include:

- Full backend feature test coverage
- Frontend automated testing
- Dynamic skills management
- Dynamic experience management
- Dynamic education management
- Admin activity logs
- Email queue processing
- Email delivery status
- Notification system
- Analytics dashboard
- Theme customization
- Dynamic branding
- Logo management
- Advanced SEO settings
- Reusable portfolio templates
- Client-specific deployments
- Role and permission management

---

# Reusable Portfolio CMS Goal

The project is designed so it can eventually become a reusable portfolio CMS.

Instead of rebuilding a portfolio from scratch for each client, the application can evolve toward:

```text
Clone Project
      ↓
Configure Branding
      ↓
Enter Client Content
      ↓
Upload Projects and CV
      ↓
Configure Domain
      ↓
Deploy
```

This makes the project suitable both as a personal developer portfolio and as a foundation for future client portfolio websites.

---

# Author

## Farah Ahmad

Full Stack Web Developer

Beirut, Lebanon

### GitHub

```text
https://github.com/Farah-Ahmad
```

### LinkedIn

```text
https://www.linkedin.com/in/farah-ahmad-bb1ba426a
```

---

# Repository

```text
https://github.com/Farah-Ahmad/My_Portfolio
```