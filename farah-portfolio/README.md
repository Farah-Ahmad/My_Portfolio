# Farah Ahmad Portfolio - Frontend

Modern and responsive developer portfolio built with React and Vite.

The frontend presents projects, technical experience, skills, CV, and contact information while consuming data dynamically from a Laravel REST API.

## Features

- Responsive personal portfolio
- Dynamic Hero section
- Dynamic About section
- Dynamic website settings
- Featured projects
- Project details pages
- Project screenshots and gallery
- GitHub and live demo links
- Dynamic CV download
- Contact form
- SEO configuration
- Admin authentication
- Admin dashboard
- Contact message inbox
- Search and filtering
- Read / unread message management
- Reply to contact messages by email
- Reply history
- Project CRUD management
- Project image management
- CV management
- Website settings management
- Responsive admin interface
- Framer Motion animations

## Tech Stack

### Frontend

- React
- JavaScript
- Vite
- React Router
- Axios
- Framer Motion
- CSS3

### Backend API

The frontend communicates with a Laravel REST API.

Backend repository:

```text
farah-portfolio-api
````

## Project Structure

```text
src/
├── admin/
├── components/
├── context/
├── pages/
├── services/
├── App.jsx
├── main.jsx
└── index.css
```

## Installation

Clone the repository:

```bash
git clone https://github.com/Farah-Ahmad/my-portfolio.git
```

Navigate to the project:

```bash
cd farah-portfolio
```

Install dependencies:

```bash
npm install
```

Create the environment file:

```bash
cp .env.example .env
```

For Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Configure the API URL inside `.env`:

```env
VITE_API_URL=http://127.0.0.1:8000/api
```

Run the development server:

```bash
npm run dev
```

## Available Scripts

Start the development server:

```bash
npm run dev
```

Run ESLint:

```bash
npm run lint
```

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Production Build

Run:

```bash
npm run build
```

The production files will be generated inside:

```text
dist/
```

Current build status:

```text
ESLint: 0 errors / 0 warnings
Production build: successful
```

## Environment Variables

Create a `.env` file from `.env.example`.

Example:

```env
VITE_API_URL=http://127.0.0.1:8000/api
```

The `.env` file should never be committed to Git.

## Main Application Areas

### Public Portfolio

* Home
* Hero
* About
* Tech Stack
* Experience
* Projects
* Project Details
* Contact
* CV Download

### Admin Panel

* Dashboard
* Contact Messages
* Read / Unread Management
* Search and Filtering
* Reply by Email
* Reply History
* Projects Management
* Project Screenshots
* CV Management
* Website Settings

## API Integration

The frontend uses a centralized Axios configuration through the service layer.

Main API areas include:

```text
/api/projects
/api/projects/{slug}
/api/contact
/api/cv/current
/api/settings

/api/admin/login
/api/admin/dashboard
/api/admin/messages
/api/admin/projects
/api/admin/cv
/api/admin/settings
```

Protected admin requests use authentication provided by the Laravel API.

## Projects Management

The admin panel allows projects to be managed dynamically.

Supported functionality includes:

* Create project
* Edit project
* Delete project
* Set project visibility
* Set project sort order
* Add technologies
* Add key features
* Add frontend details
* Add backend details
* Add database tables
* Add GitHub link
* Add live demo link
* Upload multiple screenshots
* Delete existing screenshots

Projects marked as hidden are not accessible from the public portfolio.

## Contact Message Management

Messages submitted through the public contact form are available inside the admin dashboard.

The admin can:

* View messages
* Search messages
* Filter read and unread messages
* Mark messages as read
* Mark messages as unread
* Delete messages
* Reply directly by email
* View reply history
* See replied status

Email delivery is handled by the Laravel backend.

## CV Management

The admin panel allows the portfolio CV to be managed without changing frontend code.

Supported actions:

* Upload CV
* Replace CV
* View current CV
* Delete CV

The public Hero section automatically displays the CV button when a CV is available.

## Website Settings

Portfolio content can be managed dynamically from the administration panel.

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

## Responsive Design

The interface is designed to work across:

* Desktop
* Laptop
* Tablet
* Mobile

Both the public portfolio and administration dashboard include responsive layouts.

## Code Quality

The project uses ESLint for code quality checks.

Run:

```bash
npm run lint
```

Expected result:

```text
0 errors
0 warnings
```

## Production Verification

Before deployment, run:

```bash
npm run lint
npm run build
```

The project has been successfully built using Vite for production.

## Security Notes

* Sensitive credentials are not stored in frontend source code.
* Environment variables are stored in `.env`.
* `.env` is excluded from Git.
* `.env.example` is provided as a safe configuration template.
* Admin routes require authentication.
* API calls are centralized through the Axios service layer.
* Backend validation and authorization protect administrative actions.

## Related Backend Repository

The Laravel backend for this project is available separately:

```text
https://github.com/Farah-Ahmad/farah-portfolio-api
```

## Backend Technologies

The backend repository uses:

* PHP
* Laravel
* MySQL
* Laravel Sanctum
* RESTful APIs
* Eloquent ORM
* SMTP email delivery

## Development Workflow

Typical local development setup:

### 1. Start Laravel API

From the backend project:

```bash
php artisan serve
```

The API will normally run at:

```text
http://127.0.0.1:8000
```

### 2. Start React Frontend

From the frontend project:

```bash
npm run dev
```

The frontend will connect to:

```text
http://127.0.0.1:8000/api
```

through:

```env
VITE_API_URL=http://127.0.0.1:8000/api
```

## Future Improvements

Possible future improvements include:

* Additional automated frontend tests
* Theme customization from the admin panel
* Dynamic experience management
* Dynamic skills management
* Dynamic education management
* Additional portfolio sections
* Reusable client portfolio templates
* Advanced analytics
* Notification system
* Improved accessibility testing

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

