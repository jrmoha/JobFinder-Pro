# JobFinder-Pro

<p align="center">
  <img src="https://cdn-icons-png.flaticon.com/512/6295/6295417.png" width="100" />
</p>

<p align="center">
    <h1 align="center">JobFinder-Pro</h1>
</p>

<p align="center">
    <em>JobFinder-Pro is a job search application that allows users to search for jobs, apply for jobs, and manage their applications.</em>
</p>

<p align="center">
	<img src="https://img.shields.io/github/license/jrmoha/JobFinder-Pro?style=flat&color=0080ff" alt="license">
	<img src="https://img.shields.io/github/last-commit/jrmoha/JobFinder-Pro?style=flat&logo=git&logoColor=white&color=0080ff" alt="last-commit">
	<img src="https://img.shields.io/github/languages/top/jrmoha/JobFinder-Pro?style=flat&color=0080ff" alt="repo-top-language">
	<img src="https://img.shields.io/github/languages/count/jrmoha/JobFinder-Pro?style=flat&color=0080ff" alt="repo-language-count">
</p>

<p align="center">
	<em>Developed with the software and tools below.</em>
</p>

<p align="center">
	<img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=flat&logo=JavaScript&logoColor=black" alt="JavaScript">
	<img src="https://img.shields.io/badge/Nodemon-76D04B.svg?style=flat&logo=Nodemon&logoColor=white" alt="Nodemon">
	<img src="https://img.shields.io/badge/JSON-000000.svg?style=flat&logo=JSON&logoColor=white" alt="JSON">
	<img src="https://img.shields.io/badge/Express-000000.svg?style=flat&logo=Express&logoColor=white" alt="Express">
	<img src="https://img.shields.io/badge/MongoDB-47A248.svg?style=flat&logo=MongoDB&logoColor=white" alt="MongoDB">
</p>

<hr>

## Quick Links

- [Overview](#overview)
- [Features](#features)
- [Repository Structure](#repository-structure)
- [Modules](#modules)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Running JobFinder-Pro](#running-jobfinder-pro)
  - [API Reference](#api-reference)
  - [User](#1---user)
  - [Company](#2---company)
  - [Job](#3---job)
- [Project Roadmap](#project-roadmap)

---

## Overview

JobFinder-Pro is a comprehensive job search application that enables users to search for jobs, apply for them, and manage their applications. Built with Node.js, Express.js, and MongoDB, it provides a robust platform for job seekers and companies.

---

## Features

### 1. User Features

- **Sign Up**: Create a new account.
- **Sign In**: Sign in using email or mobile number and password.
- **Update Account**: Update email, mobile number, recovery email, DOB, last name, first name.
- **Delete Account**: Delete account data.
- **Get User Account Data**: Retrieve account data.
- **Get Profile Data for Another User**: Retrieve profile data for another user using userId.
- **Update Password**: Change current password.
- **Forgot Password**: Reset password securely.
- **Get All Accounts Associated with a Specific Recovery Email**: Retrieve all accounts linked to a recovery email.

### 2. Company Features

- **Add Company**: Apply authorization with role (Company_HR).
- **Update Company Data**: Only the company owner can update the data; apply authorization with role (Company_HR).
- **Delete Company Data**: Only the company owner can delete the data; apply authorization with role (Company_HR).
- **Get Company Data**: Retrieve company data using companyId and return all jobs related to the company; apply authorization with role (Company_HR).
- **Search for a Company by Name**: Apply authorization with role (Company_HR and User).
- **Get All Applications for Specific Jobs**: Each company owner can view applications for their jobs only, with user data; apply authorization with role (Company_HR).

### 3. Job Features

- **Add Job**: Apply authorization with the role (Company_HR).
- **Update Job**: Apply authorization with the role (Company_HR).
- **Delete Job**: Apply authorization with the role (Company_HR).
- **Get All Jobs with Company Information**: Apply authorization with the role (User, Company_HR).
- **Get All Jobs for a Specific Company**: Apply authorization with the role (User, Company_HR); send the company name in the query.
- **Get All Jobs Matching Filters**: Allow filtering by working time, job location, seniority level, job title, and technical skills; apply authorization with the role (User, Company_HR).
- **Apply to Job**: Add a new document in the application collections with the new data; apply authorization with the role (User).

### 4. Bonus Points

- **Add Endpoint for Applications Report**: Collect applications for a specific company on a specific day and create an Excel sheet with this data.

---

## Repository Structure

```sh
└── JobFinder-Pro/
    ├── LICENSE
    ├── README.md
    ├── config
    │   └── .env.example
    ├── database
    │   ├── index.js
    │   └── models
    │       ├── application.model.js
    │       ├── company.model.js
    │       ├── job.model.js
    │       └── user.model.js
    ├── doc
    │   └── jobs.finder.postman_collection.json
    ├── index.js
    ├── package-lock.json
    ├── package.json
    └── src
        ├── app.js
        ├── middleware
        │   ├── async.handler.js
        │   ├── authentication.middleware.js
        │   ├── error.handler.js
        │   └── validation.middleware.js
        ├── modules
        │   ├── company
        │   │   ├── company.controller.js
        │   │   ├── company.routes.js
        │   │   └── company.validate.js
        │   ├── job
        │   │   ├── job.controller.js
        │   │   ├── job.routes.js
        │   │   └── job.validate.js
        │   └── user
        │       ├── user.controller.js
        │       ├── user.routes.js
        │       └── user.validate.js
        └── utils
            ├── APIError.js
            ├── cloudinary.js
            ├── input.schema.js
            ├── media.types.js
            └── multer.global.js
```

---

## Modules

<details>
  <summary>package.json</summary>

| File                                                                                       | Summary                        |
| ------------------------------------------------------------------------------------------ | ------------------------------ |
| [package.json](https://github.com/jrmoha/JobFinder-Pro/blob/master/package.json)           | Configuration and dependencies |
| [package-lock.json](https://github.com/jrmoha/JobFinder-Pro/blob/master/package-lock.json) | Lockfile for dependencies      |

</details>

<details>
  <summary>index.js</summary>

| File                                                                     | Summary                         |
| ------------------------------------------------------------------------ | ------------------------------- |
| [index.js](https://github.com/jrmoha/JobFinder-Pro/blob/master/index.js) | Entry point for the application |

</details>

<details>
  <summary>config</summary>

| File                                                                                    | Summary                           |
| --------------------------------------------------------------------------------------- | --------------------------------- |
| [.env.example](https://github.com/jrmoha/JobFinder-Pro/blob/master/config/.env.example) | Environment variable example file |

</details>

<details>
  <summary>database</summary>

| File                                                                                                             | Summary                       |
| ---------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| [index.js](https://github.com/jrmoha/JobFinder-Pro/blob/master/database/index.js)                                | Database connection setup     |
| [application.model.js](https://github.com/jrmoha/JobFinder-Pro/blob/master/database/models/application.model.js) | Application schema definition |
| [company.model.js](https://github.com/jrmoha/JobFinder-Pro/blob/master/database/models/company.model.js)         | Company schema definition     |
| [job.model.js](https://github.com/jrmoha/JobFinder-Pro/blob/master/database/models/job.model.js)                 | Job schema definition         |
| [user.model.js](https://github.com/jrmoha/JobFinder-Pro/blob/master/database/models/user.model.js)               | User schema definition        |

</details>

<details>
  <summary>doc</summary>

| File                                                                                                                               | Summary                            |
| ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| [jobs.finder.postman_collection.json](https://github.com/jrmoha/JobFinder-Pro/blob/master/doc/jobs.finder.postman_collection.json) | Postman collection for API testing |

</details>

<details>
  <summary>src</summary>

| File | Summary |
| ---- | ------- |

|
| [app.js](https://github.com/jrmoha/JobFinder-Pro/blob/master/src/app.js) | Application initialization |

</details>

<details>
  <summary>src/middleware</summary>

| File                                                                                                                            | Summary                             |
| ------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| [async.handler.js](https://github.com/jrmoha/JobFinder-Pro/blob/master/src/middleware/async.handler.js)                         | Middleware for async error handling |
| [authentication.middleware.js](https://github.com/jrmoha/JobFinder-Pro/blob/master/src/middleware/authentication.middleware.js) | Middleware for authentication       |
| [error.handler.js](https://github.com/jrmoha/JobFinder-Pro/blob/master/src/middleware/error.handler.js)                         | Middleware for error handling       |
| [validation.middleware.js](https://github.com/jrmoha/JobFinder-Pro/blob/master/src/middleware/validation.middleware.js)         | Middleware for input validation     |

</details>

<details>
  <summary>src/utils</summary>

| File                                                                                               | Summary                  |
| -------------------------------------------------------------------------------------------------- | ------------------------ |
| [APIError.js](https://github.com/jrmoha/JobFinder-Pro/blob/master/src/utils/APIError.js)           | Custom API error class   |
| [cloudinary.js](https://github.com/jrmoha/JobFinder-Pro/blob/master/src/utils/cloudinary.js)       | Cloudinary configuration |
| [input.schema.js](https://github.com/jrmoha/JobFinder-Pro/blob/master/src/utils/input.schema.js)   | Input validation schema  |
| [media.types.js](https://github.com/jrmoha/JobFinder-Pro/blob/master/src/utils/media.types.js)     | Media types definitions  |
| [multer.global.js](https://github.com/jrmoha/JobFinder-Pro/blob/master/src/utils/multer.global.js) | Multer configuration     |

</details>

<details>
  <summary>src/modules/company</summary>

| File                                                                                                                   | Summary                      |
| ---------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| [company.controller.js](https://github.com/jrmoha/JobFinder-Pro/blob/master/src/modules/company/company.controller.js) | Company controller functions |
| [company.routes.js](https://github.com/jrmoha/JobFinder-Pro/blob/master/src/modules/company/company.routes.js)         | Routes for company endpoints |
| [company.validate.js](https://github.com/jrmoha/JobFinder-Pro/blob/master/src/modules/company/company.validate.js)     | Validation for company data  |

</details>

<details>
  <summary>src/modules/job</summary>

| File                                                                                                       | Summary                  |
| ---------------------------------------------------------------------------------------------------------- | ------------------------ |
| [job.controller.js](https://github.com/jrmoha/JobFinder-Pro/blob/master/src/modules/job/job.controller.js) | Job controller functions |
| [job.routes.js](https://github.com/jrmoha/JobFinder-Pro/blob/master/src/modules/job/job.routes.js)         | Routes for job endpoints |
| [job.validate.js](https://github.com/jrmoha/JobFinder-Pro/blob/master/src/modules/job/job.validate.js)     | Validation for job data  |

</details>

<details>
  <summary>src/modules/user</summary>

| File                                                                                                          | Summary                   |
| ------------------------------------------------------------------------------------------------------------- | ------------------------- |
| [user.controller.js](https://github.com/jrmoha/JobFinder-Pro/blob/master/src/modules/user/user.controller.js) | User controller functions |
| [user.routes.js](https://github.com/jrmoha/JobFinder-Pro/blob/master/src/modules/user/user.routes.js)         | Routes for user endpoints |
| [user.validate.js](https://github.com/jrmoha/JobFinder-Pro/blob/master/src/modules/user/user.validate.js)     | Validation for user data  |

</details>

---

## Getting Started

### Requirements

Ensure you have the following dependencies installed on your system:

- **NodeJS**: `v17.0` or higher

### Installation

1. Clone the JobFinder-Pro repository:

```sh
git clone https://github.com/jrmoha/JobFinder-Pro
```

2. Change to the project directory:

```sh
cd JobFinder-Pro
```

3. Install the dependencies:

```sh
npm install
```

4. Create a `.env` file in the `config` directory and add the environment variables from `.env.example`.

### Running JobFinder-Pro

Use the following command to run JobFinder-Pro:

```sh
npm start
```

Or

```sh
node index.js
```

---

5. Signup as a user or company to access the features and don't forget to specify Bearer token and put it before token in token header.

---

## API Reference

### 1 - User

#### Create new user

```http
  POST /users/register
```

**Request Body:**

| Key           | Type   | Required |
| ------------- | ------ | -------- |
| firstName     | string | Yes      |
| lastName      | string | Yes      |
| email         | string | Yes      |
| password      | string | Yes      |
| DOB           | string | Yes      |
| mobileNumber  | string | Yes      |
| recoveryEmail | string | No       |

#### Login

```http
  POST /users/login
```

**Request Body:**

| Key      | Type   | Required | Description            |
| -------- | ------ | -------- | ---------------------- |
| query    | string | Yes      | email or mobile number |
| password | string | Yes      |                        |

#### Update user

```http
  PATCH /users/update
```

**Headers:**

| Key   | Type   | Required |
| ----- | ------ | -------- |
| token | string | Yes      |

**Request Body:**

| Key           | Type   | Required |
| ------------- | ------ | -------- |
| email         | string | No       |
| mobileNumber  | string | No       |
| recoveryEmail | string | No       |
| DOB           | string | No       |
| firstName     | string | No       |
| lastName      | string | No       |

#### Delete user

```http
  DELETE /users/delete
```

**Headers:**

| Key   | Type   | Required |
| ----- | ------ | -------- |
| token | string | Yes      |

#### Current user

```http
  GET /users/me
```

**Headers:**

| Key   | Type   | Required |
| ----- | ------ | -------- |
| token | string | Yes      |

#### User profile

```http
  GET /users/:id
```

**Parameters:**

| Key | Value  | Description |
| --- | ------ | ----------- |
| id  | string | User ID     |

#### Change Password

```http
  PATCH /users/change-password
```

**Headers:**

| Key   | Type   | Required |
| ----- | ------ | -------- |
| token | string | Yes      |

**Request Body:**

| Key                   | Type   | Required |
| --------------------- | ------ | -------- |
| old_password          | string | Yes      |
| password              | string | Yes      |
| password_confirmation | string | Yes      |

#### Forgot Password

```http
  POST /users/forgot-password
```

**Request Body:**

| Key      | Type   | Required |
| -------- | ------ | -------- |
| email    | string | Yes      |
| otp      | string | Yes      |
| password | string | Yes      |

#### Request Otp

```http
  POST /users/send-otp
```

**Request Body:**

| Key   | Type   | Required |
| ----- | ------ | -------- |
| email | string | Yes      |

#### Get all associated with recovery email

```http
  GET /users/all?recoveryEmail=:email
```

**Parameters:**

| Key   | Value  | Description    |
| ----- | ------ | -------------- |
| email | string | Recovery Email |

---

### 2 - Company

#### Add Company

```http
  POST /company/add
```

**Headers:**

| Key   | Type   | Required |
| ----- | ------ | -------- |
| token | string | Yes      |

**Request Body:**

| Key               | Type   | Required |
| ----------------- | ------ | -------- |
| companyName       | string | Yes      |
| description       | string | Yes      |
| industry          | string | Yes      |
| address           | string | Yes      |
| numberOfEmployees | number | Yes      |
| companyEmail      | string | Yes      |

#### Update Company

```http
  PATCH /company/update/:id
```

**Headers:**

| Key   | Type   | Required |
| ----- | ------ | -------- |
| token | string | Yes      |

**Request Body:**

| Key               | Type   | Required |
| ----------------- | ------ | -------- |
| companyName       | string | No       |
| description       | string | No       |
| industry          | string | No       |
| address           | string | No       |
| numberOfEmployees | number | No       |
| companyEmail      | string | No       |

#### Delete Company

```http
  DELETE /company/delete/:id
```

**Headers:**

| Key   | Type   | Required |
| ----- | ------ | -------- |
| token | string | Yes      |

**Parameters:**

| Key | Type   | Required |
| --- | ------ | -------- |
| id  | string | Yes      |

#### Company Data

```http
  GET /company/:id
```

**Headers:**

| Key   | Type   | Required |
| ----- | ------ | -------- |
| token | string | Yes      |

**Parameters:**

| Key | Type   | Required |
| --- | ------ | -------- |
| id  | string | Yes      |

#### Search

```http
  GET /company/search?q=:query
```

**Parameters:**

| Key | Type   | Required | Description  |
| --- | ------ | -------- | ------------ |
| q   | string | Yes      | Search query |

#### Applications

```http
  GET /company/applications
```

**Headers:**

| Key   | Type   | Required |
| ----- | ------ | -------- |
| token | string | Yes      |

#### Today's Applications

```http
  GET /company/applications/today
```

**Headers:**

| Key   | Type   | Required |
| ----- | ------ | -------- |
| token | string | Yes      |

---

### 3 - Job

#### Add Job

```http
  POST /job/add
```

**Headers:**

| Key   | Type   | Required |
| ----- | ------ | -------- |
| token | string | Yes      |

**Request Body:**

| Key             | Type   | Required |
| --------------- | ------ | -------- |
| jobTitle        | string | Yes      |
| jobLocation     | string | Yes      |
| workingTime     | string | Yes      |
| seniorityLevel  | string | Yes      |
| jobDescription  | string | Yes      |
| technicalSkills | string | Yes      |
| softSkills      | string | Yes      |

#### Update job

```http
  PATCH /job/update/:id
```

**Headers:**

| Key   | Type   | Required |
| ----- | ------ | -------- |
| token | string | Yes      |

**Request Body:**

| Key             | Type   | Required |
| --------------- | ------ | -------- |
| jobTitle        | string | No       |
| jobLocation     | string | No       |
| workingTime     | string | No       |
| seniorityLevel  | string | No       |
| jobDescription  | string | No       |
| technicalSkills | string | No       |
| softSkills      | string | No       |

**Parameters:**

| Key | Type   | Required |
| --- | ------ | -------- |
| id  | string | Yes      |

#### Delete job

```http
  DELETE /job/delete/:id
```

**Headers:**

| Key   | Type   | Required |
| ----- | ------ | -------- |
| token | string | Yes      |

**Parameters:**

| Key | Type   | Required |
| --- | ------ | -------- |
| id  | string | Yes      |

#### All jobs

```http
  GET /job/all
```

#### Search

```http
  GET /job/search?name=:query
```

**Parameters:**

| Key  | Type   | Required | Description  |
| ---- | ------ | -------- | ------------ |
| name | string | Yes      | Search query |

#### Search by Filter

```http
  GET /job/search/filter
```

**Request Body:**

| Key              | Type   | Required |
| ---------------- | ------ | -------- |
| workingTime      | string | No       |
| jobLocation      | string | No       |
| seniorityLevel   | string | No       |
| jobTitle         | string | No       |
| techinicalSkills | string | No       |

#### Apply for a job

```http
  POST /job/apply/:id
```

**Headers:**

| Key   | Type   | Required |
| ----- | ------ | -------- |
| token | string | Yes      |

**Parameters:**

| Key | Type   | Required | Description |
| --- | ------ | -------- | ----------- |
| id  | string | Yes      | Job ID      |

**Request Body:**

| Key            | Type     | Required |
| -------------- | -------- | -------- |
| userTechSkills | [string] | Yes      |
| userSoftSkills | [string] | Yes      |
| resume         | file     | Yes      |

---

## Project Roadmap

### Future Enhancements

1. **User Notifications**: Implement a notification system for job applications status updates.
2. **Job Recommendations**: Create a recommendation engine to suggest jobs to users based on their profiles and activity.
3. **Advanced Search Filters**: Add more filters to the job search functionality, such as salary range and company ratings.
4. **Company Verification**: Introduce a verification system for companies to ensure authenticity.
5. **Mobile App**: Develop a mobile application for JobFinder-Pro to enhance accessibility.

---

Hope you enjoy using JobFinder-Pro! If you have any questions or need further assistance, please feel free to reach out.

---
