# TradePilot — Trading Setup Analyzer

TradePilot is a trading setup analysis platform built to help traders validate setups before entering a trade.

The goal of the project is not to predict the market or automate trading.  
The goal is to reduce emotional decisions by using a structured, rule-based analysis process.

## Project Status

🚧 Work in progress

Current focus:

- Frontend setup
- Authentication pages
- Login/Register flow
- Auth handling with HttpOnly cookies
- Basic landing page and navigation

## Main Idea

TradePilot analyzes trading setups based on predefined rules such as:

- Daily bias
- 4H bias
- Trading session
- Order Block / Fair Value Gap zone
- Liquidity sweep
- CHOCH / BOS confirmation
- Risk-to-reward ratio

The system will return one of three decisions:

- `TRADE`
- `WAIT`
- `NO TRADE`

## Tech Stack

### Frontend

- React
- TypeScript
- React Router
- Axios
- CSS Modules / component-based CSS

### Backend

- Django
- Django REST Framework
- PostgreSQL
- SimpleJWT
- HttpOnly Cookie Authentication

## Planned Features

- User authentication
- Setup analysis form
- Rule-based scoring engine
- Analysis history
- Trade journal
- Dashboard statistics
- Win/loss tracking
- Trading session performance
- Bias alignment statistics

## Current Frontend Features

- Home page
- Login page
- Register page
- Navigation bar
- Axios API service
- Auth context
- Protected route structure
- Refresh token handling with Axios interceptor

## Project Structure

```txt
src/
  components/
    NavBar/
    LoginPage/
    RegisterPage/
    HomePage/

  context/
    AuthContext.ts
    AuthProvider.tsx
    useAuth.ts

  routes/
    router.tsx

  services/
    api.ts
    authService.ts

  types/
    interfaces.ts
```

## Development Setup

Install dependencies:

```bash
npm install
```

Run frontend:

```bash
npm run dev
```

Backend should run locally on:

```txt
http://localhost:8000
```

Frontend runs on:

```txt
http://localhost:5173
```

## Authentication Flow

The project uses JWT authentication with HttpOnly cookies.

Expected flow:

```txt
Login
  -> backend sets access_token and refresh_token cookies

Frontend requests protected data
  -> cookies are sent automatically with withCredentials: true

If access_token expires
  -> Axios interceptor calls /users/refresh/
  -> backend sets new access_token
  -> original request is retried
```

## API Endpoints

Current auth endpoints:

```txt
POST /users/register/
POST /users/login/
POST /users/logout/
GET  /users/me/
POST /users/refresh/
```

Planned analysis endpoints:

```txt
POST /api/analysis/evaluate/
POST /api/analysis/
GET  /api/analysis/
GET  /api/analysis/:id/
PUT  /api/analysis/:id/
DELETE /api/analysis/:id/
```

## Product Principle

TradePilot should answer one key question:

> Is this setup actually valid, or am I forcing a trade?

## Notes

This README is temporary and will be updated as the project architecture becomes more stable.
