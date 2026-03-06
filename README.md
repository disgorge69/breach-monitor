# Breach Monitor

A full-stack breach monitoring application with a terminal-themed UI. Tracks data breaches and displays them in real-time.

## Tech Stack

- **Backend**: Express.js, PostgreSQL, Drizzle ORM
- **Frontend**: React, TanStack Query, Tailwind CSS
- **Database**: PostgreSQL with Drizzle ORM

![screenshot](https://github.com/disgorge69/breach-monitor/blob/main/screenshot_Breach-Monitor.png)

## Prerequisites

- Node.js 18+
- PostgreSQL database

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure database:**
   
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL=postgresql://user:password@localhost:5432/breach_monitor
   PORT=5000
   ```

3. **Push database schema:**
   ```bash
   npm run db:push
   ```

## Running the Project

### Development Mode
```bash
npm run dev
```

The app will be available at `http://localhost:5000`

### Production Mode
```bash
npm run build
npm run start
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run check` | Run TypeScript type check |
| `npm run db:push` | Push database schema |

## Features

- Real-time breach data monitoring (polls every 3 seconds)
- Add new breach records via UI
- Search and filter breaches
- Terminal/hacker-themed UI
- Automatic database seeding with sample data
