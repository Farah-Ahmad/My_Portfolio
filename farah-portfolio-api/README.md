أكيد، هيدا README كامل للـbackend، جاهز copy-paste داخل:

```text
farah-portfolio-api/README.md
```

````md
# Farah Ahmad Portfolio - Laravel API

Backend REST API for a full-stack developer portfolio built with Laravel and MySQL.

This API powers the public portfolio and administration dashboard, including authentication, project management, contact messages, email replies, CV management, website settings, and dashboard statistics.

## Features

- RESTful API architecture
- Laravel Sanctum authentication
- Protected admin routes
- Admin authorization middleware
- Admin dashboard statistics
- Contact form message storage
- Contact message search and filtering
- Read / unread message management
- Message deletion
- Reply to contact messages by email
- Reply history
- Project CRUD management
- Project visibility management
- Project sorting
- Multiple project screenshot uploads
- Project screenshot deletion
- CV upload and management
- Website settings management
- SEO settings
- Contact form rate limiting
- Admin login rate limiting
- Honeypot spam protection
- Request validation
- File type and size validation

## Tech Stack

- PHP
- Laravel
- MySQL
- Laravel Sanctum
- Eloquent ORM
- REST API
- SMTP / Gmail
- Blade Email Templates

## Main API Routes

### Public Routes

```text
POST   /api/contact

GET    /api/projects
GET    /api/projects/{slug}

GET    /api/cv/current

GET    /api/settings

POST   /api/admin/login
````

### Protected Admin Routes

Protected routes require:

```text
auth:sanctum
admin
```

Main protected endpoints:

```text
GET    /api/admin/dashboard

GET    /api/admin/me
POST   /api/admin/logout

GET    /api/admin/messages
GET    /api/admin/messages/{contactMessage}
PATCH  /api/admin/messages/{contactMessage}/read
PATCH  /api/admin/messages/{contactMessage}/unread
POST   /api/admin/messages/{contactMessage}/reply
DELETE /api/admin/messages/{contactMessage}

GET    /api/admin/projects
POST   /api/admin/projects
GET    /api/admin/projects/{project}
PUT    /api/admin/projects/{project}
DELETE /api/admin/projects/{project}

POST   /api/admin/projects/{project}/images
DELETE /api/admin/projects/{project}/images/{image}

GET    /api/admin/cv
POST   /api/admin/cv
DELETE /api/admin/cv

GET    /api/admin/settings
PUT    /api/admin/settings
```

## Project Structure

```text
app/
├── Http/
│   ├── Controllers/
│   │   └── Api/
│   └── Middleware/
│
├── Mail/
├── Models/
└── Providers/

database/
├── migrations/
├── seeders/
└── factories/

resources/
└── views/
    └── emails/

routes/
├── api.php
├── console.php
└── web.php

tests/
├── Feature/
└── Unit/
```

## Installation

Clone the repository:

```bash
git clone https://github.com/Farah-Ahmad/farah-portfolio-api.git
```

Navigate to the project:

```bash
cd farah-portfolio-api
```

Install PHP dependencies:

```bash
composer install
```

Create the environment file:

```bash
cp .env.example .env
```

For Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Generate the application key:

```bash
php artisan key:generate
```

## Environment Configuration

Configure the application URL:

```env
APP_URL=http://127.0.0.1:8000
```

Configure MySQL:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=farah_portfolio
DB_USERNAME=root
DB_PASSWORD=
```

Configure the admin account:

```env
ADMIN_NAME="Admin"
ADMIN_EMAIL=
ADMIN_PASSWORD=
```

Configure SMTP for email replies:

```env
MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=
MAIL_PASSWORD=
MAIL_FROM_ADDRESS=
MAIL_FROM_NAME="${APP_NAME}"
```

For Gmail SMTP, use a Google App Password instead of the normal Gmail account password.

## Database Setup

Run migrations:

```bash
php artisan migrate
```

Seed the database:

```bash
php artisan db:seed
```

To recreate the database from scratch:

```bash
php artisan migrate:fresh --seed
```

## Storage Setup

Create the public storage link:

```bash
php artisan storage:link
```

This is required for uploaded project screenshots and CV files.

## Run the Development Server

```bash
php artisan serve
```

Default application URL:

```text
http://127.0.0.1:8000
```

Default API URL:

```text
http://127.0.0.1:8000/api
```

## Authentication

Admin authentication is handled using Laravel Sanctum.

After successful login, the backend returns an API token.

Protected requests must include:

```text
Authorization: Bearer YOUR_TOKEN
```

Admin routes are protected by:

```text
auth:sanctum
admin
```

## Contact Messages

The public contact endpoint stores messages submitted from the portfolio.

Supported admin functionality includes:

* View messages
* Search messages
* Filter by read / unread
* Mark as read
* Mark as unread
* Delete messages
* Reply by email
* Store reply history
* Display replied status

## Email Reply System

Replies are sent using Laravel Mail and SMTP.

Flow:

```text
Admin Dashboard
      ↓
Reply to Message
      ↓
Laravel Mail
      ↓
SMTP
      ↓
Recipient Email
      ↓
Reply stored in database
```

Reply history is stored only after the email is successfully sent.

## Project Management

The admin API supports:

* Create project
* Edit project
* Delete project
* Set public visibility
* Set sort order
* Technologies
* Features
* Frontend details
* Backend details
* Database tables
* GitHub URL
* Live demo URL
* Multiple screenshots

Hidden projects are excluded from the public project list and cannot be accessed through the public project details endpoint.

## Project Images

Supported image formats:

```text
JPG
JPEG
PNG
WebP
```

Images are validated by the backend before being stored.

Project images are associated with their project and can be deleted individually.

## CV Management

The admin can:

* Upload a PDF CV
* Replace the current CV
* View the current CV
* Delete the current CV

The public API exposes the current CV when available.

## Website Settings

Website content can be managed dynamically from the admin panel.

Settings include:

* Full name
* Professional title
* Location
* Contact email
* Hero label
* Hero description
* About heading
* About content
* GitHub URL
* LinkedIn URL
* SEO title
* SEO description
* Contact form visibility
* CV button visibility

## Security

The backend includes:

* Laravel Sanctum authentication
* Admin authorization middleware
* Protected admin routes
* Generic login error messages
* Admin login throttling
* Contact form throttling
* Honeypot spam protection
* Request validation
* Email validation
* File validation
* Project visibility protection
* Environment variable protection

Sensitive credentials are stored only in `.env`.

The `.env` file must never be committed to Git.

Use:

```text
.env.example
```

as the public configuration template.

## Rate Limiting

The project applies rate limiting to sensitive routes.

Examples:

```text
Contact form:
5 requests per minute per IP

Admin login:
5 attempts per minute
```

## Testing

Run the Laravel test suite:

```bash
php artisan test
```

Current test status:

```text
2 tests passed
0 failed
```

Note: the current automated tests are basic Laravel example tests. Additional feature tests can be added for authentication, projects, messages, CV management, and settings.

## Useful Commands

Clear application caches:

```bash
php artisan optimize:clear
```

View all routes:

```bash
php artisan route:list
```

Run migrations:

```bash
php artisan migrate
```

Run seeders:

```bash
php artisan db:seed
```

Run tests:

```bash
php artisan test
```

Start development server:

```bash
php artisan serve
```

## Frontend Repository

The React frontend for this project is available separately:

```text
https://github.com/Farah-Ahmad/farah-portfolio
```

Frontend technologies include:

* React
* Vite
* React Router
* Axios
* Framer Motion
* CSS3

## Local Development Workflow

### 1. Start the Laravel API

```bash
php artisan serve
```

Backend:

```text
http://127.0.0.1:8000
```

### 2. Start the React Frontend

Inside the frontend project:

```bash
npm run dev
```

Frontend `.env`:

```env
VITE_API_URL=http://127.0.0.1:8000/api
```

## Future Improvements

Possible future improvements include:

* Full automated feature test coverage
* Email queue processing
* Email delivery logs
* Admin activity logs
* Dynamic skills management
* Dynamic experience management
* Dynamic education management
* Theme customization
* Analytics dashboard
* Notification system
* Reusable portfolio templates for clients
* Advanced role and permission management

## Author

**Farah Ahmad**

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
