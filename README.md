# Start on Steroids 🚀

> A high-performance, batteries-included starter template for modern web applications.

**Start on Steroids** is a comprehensive boilerplate built to accelerate your development workflow. It combines the power of [TanStack Start](https://tanstack.com/start) with a robust backend and a beautiful, modern UI system. Designed for scalability, performance, and developer experience.

## ✨ Key Features

- **Full-Stack Power**: Built on TanStack Start for efficient server-side rendering and client-side interactivity.
- **Robust Authentication**: Secure and flexible auth system powered by [Better Auth](https://better-auth.com/).
- **Database Ready**: Type-safe database interactions with [Drizzle ORM](https://orm.drizzle.team/) and PostgreSQL.
- **Modern Styling**: Sleek, responsive UI with [Tailwind CSS v4](https://tailwindcss.com/) and a custom design system.
- **Component Library**: Includes a set of high-quality, accessible components (integrating Base UI & Shadcn concepts).
- **Code Quality**: Pre-configured with [Biome](https://biomejs.dev/) for fast linting and formatting.
- **Type Safety**: End-to-end type safety with TypeScript and Zod.

## 🛠️ Tech Stack

- **Framework**: [TanStack Start](https://tanstack.com/start) (React)
- **Database**: PostgreSQL (via Drizzle ORM)
- **Authentication**: Better Auth
- **Styling**: Tailwind CSS v4, Motion
- **Validation**: Zod
- **Package Manager**: Bun
- **Testing**: Vitest
- **Tools**: Biome, Docker

## 🚀 Getting Started

Follow these steps to get your project up and running locally.

### Prerequisites

- [Bun](https://bun.sh/) (latest version)
- Node.js & npm (optional, mainly for npx commands)
- PostgreSQL database (or use the provided Docker Compose)

### Installation

1.  **Clone the repository**

    ```bash
    git clone https://github.com/your-username/start-on-steroids.git
    cd start-on-steroids
    ```

2.  **Install dependencies**

    ```bash
    bun install
    ```

3.  **Environment Setup**

    Copy the example environment file and update the variables.

    ```bash
    cp .env.example .env
    ```

    Update `.env` with your database credentials and other secrets.

4.  **Database Setup**

    Run the migrations to set up your database schema.

    ```bash
    bun run db:migrate
    ```

5.  **Run the Development Server**

    ```bash
    bun run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📜 Scripts

| Script | Description |
| :--- | :--- |
| `bun run dev` | Starts the development server. |
| `bun run build` | Builds the application for production. |
| `bun run start` | Runs the built application. |
| `bun run test` | Runs the test suite with Vitest. |
| `bun run lint` | Lints the codebase using Biome. |
| `bun run format` | Formats code with Biome. |
| `bun run db:generate` | Generates Drizzle migrations based on schema changes. |
| `bun run db:migrate` | Applies migrations to the database. |
| `bun run db:studio` | Opens Drizzle Studio for visual database management. |

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details on how to submit pull requests, report issues, and suggest features.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 💖 Community

We are committed to providing a welcoming and inspiring community for all. Please be sure to read our [Code of Conduct](CODE_OF_CONDUCT.md).
