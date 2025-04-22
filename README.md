# Digital Diner - Full Stack Web Application

## Overview

"Digital Diner" is a prototype web application for a small restaurant, allowing users to browse the menu, add items to a cart, and place simple pickup orders online. This project utilizes the MERN stack (MongoDB, Express, React, Node.js) integrated with PostgreSQL to handle specific structured data.

## Technologies Used

- **Frontend**: React, React Router, Axios
- **Backend**: Node.js, Express, PostgreSQL, MongoDB
- **Database**: MongoDB/mongoose (for menu items), PostgreSQL/prisma (for user and order information)
- **Deployment**: Frontend deployed on Vercel

## Live Demo

You can view the deployed application here: [Digital Diner - Live Demo](https://digital-dinner-mern.vercel.app)

## Features

1. **Menu Display**: Users can see a list of available menu items categorized by Appetizers, Main Courses, Desserts, Drinks.
2. **Shopping Cart**: Users can add items to their cart, view cart contents, and see the total price.
3. **Order Placement**: Users can place an order by providing basic contact information (Name, Phone Number) and submit their cart contents.
4. **Order Confirmation/History**: After placing an order, a confirmation message is shown. Users can view their past orders using their phone number.

## Database Design

The application uses both **MongoDB** and **PostgreSQL**:

- **MongoDB** is used to store **menu items** because the data is semi-structured and can vary. MongoDB provides flexibility to handle dynamic schema for menu items (e.g., ingredients, prices, descriptions).
- **PostgreSQL** is used for **user/order data** as it requires a relational structure, such as storing user contact information and associating it with past orders. PostgreSQL ensures data integrity and relational queries.

### MongoDB Schema (Menu Items)
- Menu Items Collection:
  - `title`: String
  - `category`: String
  - `price`: Number
  - `description`: String
  - `imageUrl`: String

### PostgreSQL Schema (Orders)
- Orders Table:
  - `id`: Primary Key, Auto Increment
  - `phoneNumber`: String
  - `items`: Array (JSON)
  - `totalAmount`: Decimal
  - `created_at`: Timestamp

## API Endpoints

### Menu Endpoints
- **GET /api/menu**: Fetch all menu items.
- **GET /api/menu/:id**: Fetch a single menu item's details by ID.

### Order Endpoints
- **POST /api/orders**: Place a new order (requires cart items and contact details).
- **GET /api/orders/:phoneNumber**: Fetch order history based on the phone number.

### Admin Endpoints (Optional)
- **POST /api/menu**: Add a new menu item.

### Other APIs are present inside Routes Folder in /backend

## Setup Instructions

### Backend Setup

1. **Clone the repository**:

   git clone https://github.com/Er-Dileep-rajoriya/Digital-Dinner_MERN.git
   cd Digital-Dinner_MERN/backend
2. **Install dependencies**:

    npm install
    Set up environment variables: Create a .env file in the root directory and add the following:

 ### env
    DATABASE_URL=Your Databse url from supabse
    PORT=3500
    DIRECT_URL=You can get direct url also from supabse
    MONGODB_URL=Your mongodb url
    FRONTEND_URL=http:Your frontend url


npm start
The backend will be running at http://localhost:3500.

Frontend Setup
Navigate to the client directory:

cd frontend
Install dependencies:

npm install
Start the React app:

npm start
The frontend will be running at http://localhost:5730 or something.

CORS Setup
To ensure the frontend (deployed on Netlify) can communicate with the backend, the CORS settings are configured to allow requests from the deployed Netlify URL.

app.use(cors({
  origin: 'https://your-deployed-link.netlify.app',
  credentials: true,
}));
PostgreSQL Database Setup
Create a PostgreSQL database and configure the .env file with the connection details.

Run migrations to create the required tables.

Assumptions & Challenges
Assumption: No payment processing is required for this project.

Challenge: Integrating MongoDB and PostgreSQL required ensuring that both databases interact correctly with the backend API.
