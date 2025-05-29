# Gym Class Scheduling and Membership Management System

## Project Overview

This system manages gym operations with three user roles: **Admin**, **Trainer**, and **Trainee**.

- Admins create trainers, schedule classes, and assign trainers.
- Trainers view their assigned classes.
- Trainees manage profiles and book class schedules.
- Enforces limits: max 5 classes per day, max 10 trainees per class, no overlapping bookings for trainees.
- JWT authentication secures API access.

---

## Technology Stack

- **Language:** TypeScript
- **Framework:** Express.js
- **ORM/ODM:** Mongoose
- **Database:** MongoDB
- **Authentication:** JWT
- **Architecture:** Modular pattern

---

## Database Schema

### Users

| Field    | Type   | Description                   |
| -------- | ------ | ----------------------------- |
| id       | UUID   | Primary Key                   |
| name     | string | User full name                |
| email    | string | Unique email                  |
| password | string | Hashed password               |
| role     | enum   | 'admin', 'trainer', 'trainee' |

### Schedules

| Field       | Type   | Description                    |
| ----------- | ------ | ------------------------------ |
| id          | UUID   | Primary Key                    |
| date        | Date   | Schedule date                  |
| startTime   | string | Start time (e.g., "10:00")     |
| endTime     | string | End time (2 hours after start) |
| trainerId   | UUID   | Foreign Key to Users (trainer) |
| maxTrainees | number | Default 10                     |

### Bookings

| Field      | Type | Description             |
| ---------- | ---- | ----------------------- |
| id         | UUID | Primary Key             |
| traineeId  | UUID | FK to Users (trainee)   |
| scheduleId | UUID | FK to Schedules         |
| status     | enum | 'active' or 'cancelled' |

---

## Relational Diagram

- Relational Diagram : [Click](https://drive.google.com/file/d/1_Ev-d19jGpf2PBBXzrAeLT3PUmUXcUjP/view?usp=sharing)

---

## API Endpoints

| Method | Endpoint               | Role Allowed | Description           |
| ------ | ---------------------- | ------------ | --------------------- |
| POST   | `/api/auth/register`   | Public       | Register a new user   |
| POST   | `/api/auth/login`      | Public       | Login and get JWT     |
| POST   | `/api/users/trainers`  | Admin        | Create a new trainer  |
| GET    | `/api/users/trainers`  | Admin        | List all trainers     |
| POST   | `/api/schedules`       | Admin        | Create class schedule |
| GET    | `/api/schedules`       | All Roles    | List schedules        |
| DELETE | `/api/schedules/:id`   | Admin        | Delete schedule       |
| POST   | `/api/bookings`        | Trainee      | Book a class schedule |
| PATCH  | `/bookings/cancel/:id` | Trainee      | Cancel a booking      |

---

## Business Rules

- Maximum 5 classes scheduled per day.
- Each class lasts exactly 2 hours.
- Maximum 10 trainees per class.
- Trainees cannot book overlapping classes.
- Trainees can cancel bookings.
- Role-based access enforced using JWT.

---

## Admin Credentials for Testing

- Email: jannatul0040@gmail.com
- Password: 1234

---

## Postman Documentation

- [Click](https://.postman.co/workspace/My-Workspace~d68c296b-9373-4721-85b2-29182a109991/collection/32459409-dc0d58e9-865d-4ad5-a602-9c038d6dcc37?action=share&creator=32459409)

---

## Running Locally

Clone the repo

- git clone https://github.com/jannat710/FitSched.git
- cd FitSched

# Install dependencies

npm install

- Setup environment variables (.env)

- Example:

- DATABASE_URL=your_database_url

- JWT_SECRET=your_jwt_secret
- BCRYPT_SALT_ROUNDS=8

# Start development server

- npm run start:dev

---

## Live Hosting Link

- [Click](https://fit-sched.vercel.app/)

---
