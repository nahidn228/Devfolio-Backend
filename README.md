# Next-DevFolio Backend

## Overview

This is the **backend API** for the Next-DevFolio personal portfolio project.  
It provides secure endpoints for managing blogs, projects, and user authentication.  
The backend is built with **Node.js, Express, Prisma/MongoDB**, and uses **JWT authentication** for protected routes.

---

## Features

### Authentication & Authorization
- JWT-based authentication
- Passwords hashed securely using `bcrypt`
- Owner-only access to private routes (dashboard, blog/project management)
- Seeded admin user for initial login

### Blog Management
- Create, Read, Update, Delete (CRUD) blogs
- Public users can fetch all blogs and view individual blog pages
- Supports featured blogs and tags
- Optional pagination for fetching blogs

### Project Management
- CRUD operations for portfolio projects
- Project details include title, description, tech stack, features, thumbnail, live/repo URLs
- Supports featured projects

### API Security
- Protected routes for owner-only operations
- Proper input validation
- Error handling with descriptive messages

---

## Tech Stack

- **Node.js** – Backend runtime  
- **Express.js** – REST API framework  
- **Prisma** (with PostgreSQL) or **Mongoose** (with MongoDB) – Database ORM/ODM  
- **JWT** – Authentication  
- **bcrypt** – Password hashing  
- **CORS** – Cross-Origin requests handling  
- **dotenv** – Environment variable management  

---

## API Endpoints

### Authentication

| Method | Endpoint | Description |
| ------ | -------- | ----------- |
| POST | `/api/auth/login` | Login with email and password |
| POST | `/api/auth/register` | Register a new user (owner/admin only) |

### Blogs

| Method | Endpoint | Description |
| ------ | -------- | ----------- |
| GET | `/api/v1/posts` | Fetch all blogs (public) |
| GET | `/api/v1/posts/:id` | Fetch a single blog |
| POST | `/api/v1/posts` | Create a blog (owner only) |
| PUT | `/api/v1/posts/:id` | Update a blog (owner only) |
| DELETE | `/api/v1/posts/:id` | Delete a blog (owner only) |

### Projects

| Method | Endpoint | Description |
| ------ | -------- | ----------- |
| GET | `/api/v1/projects` | Fetch all projects |
| GET | `/api/v1/projects/:id` | Fetch a single project |
| POST | `/api/v1/projects` | Create a project (owner only) |
| PUT | `/api/v1/projects/:id` | Update a project (owner only) |
| DELETE | `/api/v1/projects/:id` | Delete a project (owner only) |

---

## Environment Variables

Create a `.env` file at the root with the following variables:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/portfolio
JWT_SECRET=your_secret_key
NEXT_PUBLIC_BASE_API=http://localhost:5000/api/v1
PORT=5000
```