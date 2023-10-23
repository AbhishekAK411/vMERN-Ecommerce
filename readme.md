
# vMERN-Ecommerce

This project is a prototype of a ecommerce implementation, which includes the below features.

#### User Role:
The User Role has been designated so that users can view all the products, that are added by default by the database, and the Seller role as well.

#### Seller Role:
The Seller Role has been designated so that sellers can perform CRUD (Create, Read, Update, Delete) operations with products. Sellers are provided with a section where they can view the products they added, and can perform further operations on them on that page.

#### Authentication and Authorization:
Provided certain functionalities, where the user who is signing up to the web application has to follow certian rules while creating their account. JSON Web Tokens are used for authentication and authorization as well.

* Email - Validation and sanitation of email addresses are done using custom regular expressions, which enable the application to accept only known email service providers.

* Password - Sanitation of passwords are performed to prevent the same type of password and add password security to them. The passwords are stored in a hashed format using BcryptJS.

#### Client-Side Application:
The Client-Side Application is developed using ReactJS, TailwindCSS, Material Tailwind, and Framer Motion. ReactJS is a client-side Javascript library that is used to create User Interfaces. Tailwind and Material Tailwind are used to provide a seamless experience. Framer Motion is a motion library used to add motion to the User Interface. Instructions on how to proceed with starting the client-side application will be provided under **application-startup**.

#### Server-Side Application:
The server side application is made using NodeJS, ExpressJS framework and MongoDB as a DBaaS (Database as a Service). Instructions on how to proceed with starting the server-side application will be provided under **application-startup**.

#### Search:
A search functionality is provided to search for products for different categories, namely "mens", "womens" and "electronics".

#### Newest products:
Each of the newest products added by each and every seller is seen as the newest product using Badges. They indicate if a product is new in the application or not.

#### Checkout:
Once users add products to their cart, they are able to checkout their products from the cart as well. The checked out products for that particular ordder, along with the quantity is sent to the order database, that keeps track of the order history of each and every user, which can be referenced to view the order history.


## Authors

- [@vrishabhde](https://www.github.com/vrishabhde)


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

#### React Environment Variables

`REACT_APP_BACKEND_URL` = http://localhost:8000/app/auth

#### Node Environment Variables

`mongo` = MongoDB URL to connect to database.

`port` = 8000

`jwtsecret` = "vrushabh"


## Installation

Go to **Server** folder

```bash
  cd server/
  npm run start
```

on another terminal, go to **Client** folder

```bash
  cd client/
  npm run start
```

For a set of already added products, hit this route after starting the server-side application

```bash
  http://localhost:{port}/app/auth/getProductJSON
```
## React Routes

### Home Page
- **Route**: `/`
- **Description**: The home page of the application, displaying all the products fetched from the database.

### Login Page
- **Route**: `/login`
- **Description**: A page providing users/sellers to login to the web application.

### Register Page
- **Route**: `/register`
- **Description**: A page providing users to register to the web application.

### Add Products Page
- **Route**: `/addProducts`
- **Description**: A page providing sellers to add products to their dashboard.

### Edit Products Page
- **Route**: `/editProducts`
- **Description**: A page providing sellers to edit the added products from the dashboard.

### Dashboard Page
- **Route**: `/sellerProducts`
- **Description**: A page providing sellers to access their dashboard and edit or delete their added products. (Only shows products the logged in seller has added.)

### Single Product Page
- **Route**: `/single/:id`
- **Description**: Shows detailed information about a single product based on its ID.

### Cart Page
- **Route**: `/cart`
- **Description**: Shows detailed information about the products added in the cart for each user.(This is only for users, not for sellers.)

### Mens Page
- **Route**: `/mens`
- **Description**: Shows detailed information about products that are filtererd using the **mens** category.

### Womens Page
- **Route**: `/womens`
- **Description**: Shows detailed information about products that are filtererd using the **womens** category.

### Electronics Page
- **Route**: `/electronics`
- **Description**: Shows detailed information about products that are filtererd using the **electronics** category.

### Newest Page
- **Route**: `/newest`
- **Description**: Shows detailed information about products that are recently addded. (latest 20).


# Node.js API Routes

**Each Route has the following path**

http://localhost:{port}/app/auth

### User Routes
#### Register User
- **Route**: `POST /register`
- **Description**: Allows users to register with the application.

#### Login User
- **Route**: `POST /login`
- **Description**: Handles user login and authentication.

#### Get Current User
- **Route**: `POST /getCurrentUser`
- **Description**: Fetches the details of the currently logged-in user.

#### Add to Cart
- **Route**: `POST /addCart`
- **Description**: Adds a product to the user's shopping cart.

#### Get Cart Products
- **Route**: `POST /getCart`
- **Description**: Retrieves the products in the user's shopping cart.

#### Remove Cart
- **Route**: `POST /removeCart`
- **Description**: Removes products from the user's shopping cart.

### Product Routes
#### Get Product JSON
- **Route**: `GET /getProductJSON`
- **Description**: Retrieves product data in JSON format.

#### Get Default Products
- **Route**: `GET /getDefaultProducts`
- **Description**: Fetches a list of default products available.

#### Get Single Product
- **Route**: `POST /getSingleProduct`
- **Description**: Retrieves details of a single product based on the request.

### Seller Routes
#### Add Product
- **Route**: `POST /addProduct`
- **Description**: Adds a new product to the seller's inventory.

#### Get Product
- **Route**: `POST /getProduct`
- **Description**: Retrieves product information from the seller's inventory.

#### Update Product
- **Route**: `POST /updateProduct`
- **Description**: Updates an existing product's information in the seller's inventory.

#### Delete Product
- **Route**: `POST /deleteProduct`
- **Description**: Deletes a product from the seller's inventory.



