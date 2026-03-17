# Shortify - Premium URL Shortener

Shortify is a modern, high-performance URL shortening application built with **React**, **Tailwind CSS**, and **Supabase**. It features a premium, glassmorphism-based design and a robust feature set for link management and analytics.

## Features

- **Custom Short Links**: Create branded and memorable short URLs.
- **Advanced Analytics**: Track clicks, device types, and geographic locations in real-time.
- **QR Code Generation**: Automatically generate QR codes for every shortened link.
- **Premium UI**: A sleek, dark-themed interface with glassmorphism and smooth transitions.
- **Secure Authentication**: Built-in user authentication powered by Supabase.

## Tech Stack

- **Frontend**: React.js, Vite, Tailwind CSS
- **UI Components**: Shadcn UI, Lucide React
- **Backend**: Supabase (Database, Auth, Storage)
- **State Management**: React Context API
- **Form Validation**: Yup

## Getting Started

### Prerequisites

- Node.js installed on your machine.
- A Supabase account for backend functionality.

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-link>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   Create a `.env` file in the root directory and add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_KEY=your_supabase_anon_key
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

## License

Personal project.
