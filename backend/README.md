# Fashion Accessories Backend

Backend API for Fashion Accessories e-commerce platform.

## Tech Stack

- Node.js
- TypeScript
- Express.js
- MongoDB with Mongoose

## Setup

1. Install dependencies:

```bash
cd backend
npm install
```

2. Configure environment variables:

- Copy `.env.example` to `.env`
- Update MongoDB URI if needed
- **Add admin emails to `ADMIN_EMAILS`** (comma-separated)

3. Start development server:

```bash
npm run dev
```

4. Build for production:

```bash
npm run build
npm start
```

## Admin Access

Admin access is controlled by email whitelist in the `.env` file:

```
ADMIN_EMAILS=mohammeduvaiz0786@gmail.com,iamuvaiz1@gmail.com
```

**How it works:**

- When a user registers with an email in the whitelist, they automatically get `admin` role
- When a user logs in, their role is updated if the whitelist changed
- Only admins can see the Admin Dashboard link in the frontend
- Regular users get `user` role

**To add/remove admins:**

1. Edit `ADMIN_EMAILS` in `.env` file
2. Restart the backend server
3. User must logout and login again to get updated role

## API Endpoints

- `GET /health` - Health check
- `GET /api` - API info
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user (protected)
