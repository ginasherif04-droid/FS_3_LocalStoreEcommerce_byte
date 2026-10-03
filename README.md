# Maison Market — Local Store E-commerce Platform

A full-stack local store e-commerce platform developed as part of the **ArithMatrix Virtual Internship Program (AVIP) 2026**.

Maison Market allows users to browse products, view detailed product information, and manage a shopping cart. Products and cart data are stored using MongoDB.

---

## Features

* Product listing page
* Individual product detail view
* Product images, prices, descriptions, and stock status
* Add products to shopping cart
* Remove products from shopping cart
* Cart quantity tracking
* Cart total calculation
* Session-based cart persistence
* Stock validation
* Input validation for cart operations
* User-friendly success and error feedback
* Responsive and modern frontend design
* MongoDB database integration
* Sample product data for testing

---

## Technologies Used

### Frontend

* HTML5
* CSS3
* JavaScript

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

### Development Tools

* Visual Studio Code
* Git
* GitHub
* MongoDB Atlas

---

## Project Architecture

The project follows a simple full-stack structure:

```text
TASK 3 - Local Store E-commerce Platform
│
├── models/
│   ├── Product.js
│   └── Cart.js
│
├── routes/
│   ├── products.js
│   └── cart.js
│
├── public/
│   ├── index.html
│   ├── style.css
│   └── app.js
│
├── screenshots/
│   ├── Product Listing.png
│   ├── Product Details.png
│   └── Shopping Cart.png
│
├── server.js
├── seed.js
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

### Architecture Overview

**Frontend → Express API → MongoDB**

* `public/` contains the frontend interface.
* `models/` contains the MongoDB/Mongoose data models.
* `routes/` contains the product and cart API routes.
* `server.js` starts the Express server and connects the application to MongoDB.
* `seed.js` inserts sample products into the database.
* `.env` stores environment-specific configuration such as the MongoDB connection string and server port.

---

## Database Models

### Product

Each product contains:

* `name`
* `price`
* `description`
* `image`
* `stock`

### Cart

Each shopping cart contains:

* `sessionId`
* `items`
* `productId`
* `quantity`

The cart is associated with a browser session so that the cart can persist during the user's session.

---

## API Endpoints

### Products

#### Get all products

```http
GET /api/products
```

Returns all available products.

#### Get a single product

```http
GET /api/products/:id
```

Returns the details of a specific product.

---

### Cart

#### Get current cart

```http
GET /api/cart/:sessionId
```

Returns the shopping cart associated with the current session.

#### Add product to cart

```http
POST /api/cart/:sessionId/add
```

Example request body:

```json
{
  "productId": "PRODUCT_ID",
  "quantity": 1
}
```

The API validates the product and checks available stock before adding it to the cart.

#### Remove product from cart

```http
DELETE /api/cart/:sessionId/remove/:productId
```

Removes a product from the current shopping cart.

---

## Sample Data

The project includes six sample products:

* Classic Tote Bag
* Minimal Watch
* Leather Wallet
* Everyday Sneakers
* Ceramic Coffee Mug
* Scented Candle

Sample data can be inserted into MongoDB using the seed script.

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/ginasherif04-droid/FS_3_LocalStoreEcommerce_byte.git
```

### 2. Open the project folder

```bash
cd FS_3_LocalStoreEcommerce_byte
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env` file in the project root:

```env
MONGODB_URI=YOUR_MONGODB_CONNECTION_STRING
PORT=3000
```

Replace `YOUR_MONGODB_CONNECTION_STRING` with your MongoDB connection string.

> The `.env` file should not be committed to GitHub because it contains private configuration.

### 5. Add sample products

Run:

```bash
npm run seed
```

You should see:

```text
Sample products added successfully!
```

### 6. Start the server

Run:

```bash
npm start
```

The application will run on:

```text
http://localhost:3000
```

Open the address in a web browser to use the application.

---

## Available Scripts

### Start the application

```bash
npm start
```

### Seed the database

```bash
npm run seed
```

---

## User Flow

1. User opens the Maison Market store.
2. Available products are loaded from the backend API.
3. User can click a product to view its details.
4. User adds products to the shopping cart.
5. The cart is stored using a session ID.
6. The cart displays selected products, quantities, and the total price.
7. User can remove products from the cart.
8. Stock availability is checked when adding products.

---

## Validation and Error Handling

The application provides validation and feedback for common situations, including:

* Missing product ID
* Invalid product ID
* Product not found
* Invalid quantity
* Quantity exceeding available stock
* Product not found in cart
* Failed API requests

The frontend displays user-friendly toast messages for cart actions and errors.

---

## Screenshots

### Product Listing

![Product Listing](screenshots/Product%20Listing.png.jpeg)

### Product Details


![Product Details](screenshots/Product%20Details.png.jpeg)

### Shopping Cart

![Shopping Cart](screenshots/Shopping%20Cart.png.jpeg)

---

## Checkout

The checkout button is included as a visual part of the e-commerce interface. This internship task focuses on product browsing and cart functionality, so payment processing and real checkout functionality are not implemented.

---

## Project Status

The project is completed according to the requirements of **Task 3 — Local Store E-commerce Platform** for the ArithMatrix Virtual Internship Program.

### Implemented Requirements

 Product listing page
 Individual product detail view
 Product retrieval API
 Add to cart API
 Remove from cart API
 Session-persisted shopping cart
 Product image, price, description, and stock status
 Input validation
 User feedback for cart actions
 Sample product data
 Responsive frontend
 README documentation
 Screenshots
