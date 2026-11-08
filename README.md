# Studentec — Student Grant Management System

A full-stack system for student registration, grant request submission, status tracking, and advanced request management for administrators.

The client is built with React and Redux Toolkit; the server uses Node.js and Express with a MongoDB database.

<!-- Add a screenshot or short GIF here -->
<!-- ![Studentec demo](docs/demo.gif) -->

## Overview

Students submit tech scholarship requests and follow their approval. Administrators get tools to filter, sort and manage requests precisely.

- **Secure user management:** registration and login with full validation (unique ID number, length limits, password rules) and prevention of data conflicts between users.
- **Multi-step request form:** collects personal, family, academic and banking details, plus required documents (ID copy, study confirmation, bank confirmation) uploaded with Multer.
- **Admin dashboard:** advanced filtering by city, dates, number of siblings and salary range, dynamic sorting, and updating request status (waiting, allowed, rejected).

## Architecture

### Server: Node.js / Express / MongoDB (Mongoose)

**Models**

- `User`: ID number, first name, last name, password, with length checks and uniqueness.
- `GrantRequest`: a rich schema with nested objects (`personal`, `family`, `learn`, `bank`, `documents`) and a dynamic status (`waiting`, `allow`, `reject`).

**Routes**

- Users: `/users/register`, `/users/login`, `/users/all`
- Requests (including file storage): `/requests/add`, `/requests/all`, `/requests/not-allowed`, `/requests/update/:id`, `/requests/status/:tz`

### Client: React (Redux Toolkit, React Router)

- **Redux slices:** central state for users (`UserSlice`) and requests (`RequestSlice`).
- **Components:** Home, Login, the multi-step request form (`NewQuestion` / `MultyForm`), and modular form parts (personal, family, study, bank, file upload, declaration).
- **UI/UX:** modern right-to-left (RTL) design with interactive alerts (SweetAlert2).

## Key Features

- **Validation and safety checks:** duplicate ID numbers are blocked in the database, with detailed error handling on both server and client.
- **File uploads:** Multer stores ID scans, study confirmations and bank confirmations on the server.
- **Advanced admin filtering and sorting:** multiple parameters such as salary range, city and number of siblings under 18.
- **Session hygiene:** the current request in Redux is reset when a new user logs in, preventing personal data from leaking between users on a shared computer.

## Tech Stack

| Area | Technology |
|---|---|
| Backend | Node.js, Express.js, Mongoose, Multer |
| Frontend | React, Redux Toolkit, React Router, SweetAlert2 |
| Database | MongoDB |
| Styling | Custom CSS (RTL, responsive) |

## Getting Started

1. Make sure Node.js is installed and MongoDB is configured.
2. Start the server from the server folder: `npm install`, then `npm start`.
3. In the client folder, run `npm install`, then `npm start`.


