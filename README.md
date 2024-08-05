# Nest Ecommerce API

## Description

API for managing an electronic products store, including operations for products, categories, and orders.

## Prerequisites

- Node.js
- npm
- PostgreSQL

## Installation

1. Clone the repository:

```bash
git clone https://github.com/pi-rym/PM4BE-BlockBeam22Y.git
cd back/ecommerce-blockbeam22y/
```

2. Install the dependencies:

```bash
npm install
```

## Configuration

Create a `.env.development` file in the current directory with the following content:

```text
  DB_NAME=ecommerce
  DB_HOST=localhost
  DB_PORT=5432
  DB_USERNAME=yourusername
  DB_PASSWORD=yourpassword
  CLOUDINARY_CLOUD_NAME=yourcloudname
  CLOUDINARY_API_KEY=yourapikey
  CLOUDINARY_API_SECRET=yoursecret
  JWT_SECRET=yoursecretkey
  MASTER_EMAIL=your-email@example.com
```

**Note:** The `MASTER_EMAIL` is used to grant admin privileges. If a user is created with an email that matches the `MASTER_EMAIL` value, they will receive administrator permissions in the API.

## Database Migrations

1. Compile the project:

```bash
npm run build
```

2. Run the migrations:

```bash
npm run migration:run
```

## Running the Project

To start the project, run the following command:

```bash
npm start
```

## API Documentation

Once the project is running, you can access the API documentation at: http://localhost:3000/api/