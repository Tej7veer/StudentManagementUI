# Student Management UI — Angular 17

Frontend for the Student Management System built with Angular 17 (Standalone Components).

## Tech Stack
- Angular 17 (Standalone)
- TypeScript
- JWT Authentication (HTTP Interceptor)
- Route Guards

## Prerequisites
- Node.js v18+
- Angular CLI: `npm install -g @angular/cli`
- API running at `https://localhost:5001`

## Setup Steps

1. Clone the repo:
```bash
   git clone https://github.com/Tej7veer/StudentManagementUI.git
   cd StudentManagementUI
```

2. Install dependencies:
```bash
   npm install
```

3. Update the API URL in `src/environments/environment.ts`:
```typescript
   export const environment = {
     production: false,
     apiUrl: 'https://localhost:5001/api'
   };
```

4. Run the app:
```bash
   ng serve
```

5. Open browser: `http://localhost:4200`

## Login Credentials
- **Username:** admin
- **Password:** admin123

## Features
- Login page with JWT token storage
- View all students in a table
- Add new student
- Edit existing student
- Delete student
- Auth guard — redirects to login if not authenticated
- HTTP interceptor — auto-attaches Bearer token to all requests

## API Repo
https://github.com/Tej7veer/StudentManagementSystem
