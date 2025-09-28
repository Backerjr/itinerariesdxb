# Ahmed Travel App

A starter Next.js + Prisma project for guest booking lookup.

## Features
- Guests enter **name + email** to see their confirmed bookings.
- Prisma ORM with PostgreSQL backend.
- Next.js frontend with BookingCard UI.

## Setup
1. Clone repo and install deps:
   ```bash
   npm install
   ```

2. Configure `.env` with your database URL:
   ```
   DATABASE_URL="postgresql://user:pass@host:5432/db"
   ```

3. Run migrations:
   ```bash
   npx prisma migrate dev --name init
   ```

4. Start dev server:
   ```bash
   npm run dev
   ```

Visit `http://localhost:3000` to test.
