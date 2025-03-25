# 4DESA Social App

A social media application built with Next.js, featuring user authentication, post creation with media uploads, and profile management.

## Technologies Used

-   **Frontend**: Next.js, React, Tailwind CSS
-   **Authentication**: Clerk
-   **Database**: MongoDB on Azure Cosmos DB
-   **Storage**: Azure Blob Storage
-   **Deployment**: Vercel
-   **Security**: Azure Key Vault for secrets management

## Getting Started

### Prerequisites

-   Node.js (v18 or later)
-   npm or yarn
-   Azure account for cloud services
-   Vercel account for deployment

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/4desa_proj.git
cd 4desa_proj
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Set up environment variables:

Create a `.env.local` file in the root directory with the following variables:

```
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Azure Storage
AZURE_STORAGE_ACCOUNT_NAME=your_storage_account_name
AZURE_STORAGE_ACCOUNT_KEY=your_storage_account_key

# MongoDB Connection
MONGODB_URI=your_mongodb_connection_string

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Running the Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.
Got to [http://localhost:3000/doc](http://localhost:3000/doc) to read the Swagger API documentation.

## Azure Services Configuration

### Azure Blob Storage

This project uses Azure Blob Storage for storing user-uploaded media (images and videos). The application creates containers for different types of media and generates SAS tokens for secure uploads.

### Azure Cosmos DB with MongoDB API

User data and posts are stored in MongoDB collections hosted on Azure Cosmos DB. This provides a scalable and globally distributed database solution.

### Azure Key Vault

Sensitive configuration values and secrets are stored in Azure Key Vault for enhanced security.

## Deployment

The application is deployed on Vercel. To deploy your own instance:

1. Push your code to a GitHub repository
2. Connect your Vercel account to your repository
3. Configure the environment variables in the Vercel dashboard
4. Deploy the application

## Features

-   User authentication and profile management
-   Post creation with text and media (images/videos)
-   Feed of recent posts
-   User profiles with post history
-   Responsive design for mobile and desktop

## Project Structure

-   `/src/app`: Next.js application routes and API endpoints
-   `/src/components`: Reusable React components
-   `/src/utils`: Utility functions and helpers
-   `/src/types`: TypeScript type definitions
