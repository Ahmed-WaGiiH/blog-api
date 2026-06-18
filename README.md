# Personal Blogging Platform API

A secure, scalable RESTful API for managing blog posts with JWT authentication. Built with Node.js, Express, TypeScript, and PostgreSQL.

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js v22 |
| Framework | Express.js |
| Language | TypeScript |
| Database | PostgreSQL |
| ORM | Prisma 7 |
| Authentication | JWT (jsonwebtoken) |
| Password Hashing | bcryptjs (saltRounds=12) |
| Validation | Zod |
| Documentation | Swagger UI (OpenAPI 3.0) |

---

## Database Choice — Why PostgreSQL?

PostgreSQL was chosen over NoSQL alternatives for the following reasons:

- **Relational integrity** — The one-to-many relationship between `User` and `Post` is a natural fit for a relational model. Foreign key constraints at the database level prevent orphaned posts if a user is deleted.
- **ACID compliance** — Guarantees data consistency for write operations.
- **Structured schema** — Blog data is highly structured and predictable, making a rigid schema an advantage rather than a limitation.
- **Prisma support** — Prisma 7's type-safe query builder works seamlessly with PostgreSQL, providing full TypeScript inference on all queries.

---

## 📁 Project Structure

```
src/
├── controllers/        # Business logic
├── middlewares/        # Auth, validation, error handler
├── routes/             # Express routers with Swagger annotations
├── validators/         # Zod schemas
├── utils/              # Prisma client, JWT helpers, Swagger config
└── types/              # Express type extensions
```

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js v18+
- PostgreSQL running locally

### Steps

**1. Clone the repository**
```bash
git clone https://github.com/your-Ahmed-WaGiiH/blog-api.git
cd blog-api
```

**2. Install dependencies**
```bash
npm install
```

**3. Configure environment variables**
```bash
cp .env.example .env
```

Fill in your `.env`:
```env
PORT=5000
NODE_ENV=development
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/blog_api"
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRES_IN=7d
```

**4. Create the database**

Make sure PostgreSQL is running, then create a database named `blog_api` via pgAdmin or:
```bash
psql -U postgres -c "CREATE DATABASE blog_api;"
```

**5. Run migrations**
```bash
npx prisma migrate dev --name init
```

**6. Generate Prisma client**
```bash
npx prisma generate
```

**7. Start the server**
```bash
npm run dev
```

Server runs at `http://localhost:5000`
Swagger UI at `http://localhost:5000/api-docs`

---

## 🔌 API Endpoints

All endpoints are prefixed with `/api/v1`.

### Auth

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/auth/register` | Public | Register a new user |
| POST | `/auth/login` | Public | Login and receive JWT |

### Posts

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/posts` | Public | Get all blog posts |
| POST | `/posts` | 🔒 Protected | Create a new post |
| PUT | `/posts/:id` | 🔒 Protected | Update a post (owner only) |
| DELETE | `/posts/:id` | 🔒 Protected | Delete a post (owner only) |

> Protected routes require `Authorization: Bearer <token>` header.

---

## 🔒 Security Features

- Passwords hashed with **bcrypt** (saltRounds=12)
- **JWT** tokens with configurable expiry
- Ownership guard on all write operations — users can only modify their own posts
- Email normalized to lowercase to prevent duplicate accounts
- Request body size limited to 10kb
- Input sanitized to strip `$`, `<`, `>` characters

---

## API Documentation

Interactive Swagger UI is available at `/api-docs` when the server is running.

Live demo: `https://your-app.railway.app/api-docs`

---

## 🚀 Deployment

This API is deployed on **Railway** with a managed PostgreSQL instance.

Live URL: `https://your-app.railway.app`