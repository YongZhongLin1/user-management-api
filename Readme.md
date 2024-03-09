# Project Name README

## Pre-requisite
- Node.js installed on your machine. You can download and install it from [Node.js official website](https://nodejs.org/).
- Docker installed on your machine. You can download and install it from [Docker official website](https://www.docker.com/products/docker-desktop).

## How to Run Locally
1. **Clone the Repository:**
2. **Run Docker Compose:**
```
docker compose up -d
```
This command will spin up the necessary Docker containers for the project in detached mode. Postgre DB is running in Docker. Once command above is run, it will create some sample data in database as well.

3. **Install Dependencies:**
```
npm install
```
This command will install the required Node.js dependencies for the project.

4. **Start the Application:**
```
npm run start
```
This command will start the application. You should now be able to access it locally.

```
project-root
│
├── route.js # API routes definition
│
├── controller/ # Logic controllers
│ └── *.js # Each controller for specific route or resource
│
├── service/ # Database query functions
│ └── *.js # Each service for specific database operation
│
├── utils/ # Utility functions
│ └── *.js # Each utility function
│
├── constants/ # Constant values
│ └── *.js # Each constant file
│
├── config/ # Database configuration
│ └── *.js # Database configuration files
│
└── server.config.js # Server configuration
```

## Additional Information
- Database credentials may be found in `config/db.js`.
- Ensure that no other services are running on the ports that this application requires to avoid conflicts.
- After running `docker-compose up -d`, give it a few moments for Docker to set up the environment before proceeding with other commands.
- For any issues or troubleshooting, please refer to the project documentation or reach out to the project maintainers.

## API Documentation

### Admin Action API
- **Login**: 
  - URL: `:url/arrivo/api/admin/v1/login`
  - Method: `POST`
  - Description: Allows admins to login and obtain an access token.
  - Parameters:
    - `username` (required): Admin username.
    - `password` (required): Admin password.
  
![Image Alt Text](/assets/screenshots/admin_login.PNG)


- **Refresh Token**:
  - URL: `:url/arrivo/api/admin/v1/token/refresh`
  - Method: `POST`
  - Description: Allows admins to refresh their access token. Once token is being refreshed, the old token will be expired.
  - Headers:
    - `authorization` (required): jwt token from Login API

![Image Alt Text](/assets/screenshots/admin_refresh_token.PNG)

### Admin User Management API

- **Fetch User List**

    - URL: `/admin/v1/user`
    - Method: `GET`
    - Description: Fetches a list of all users.
    - Headers:
        - `authorization` (required): jwt token from Login API

![Image Alt Text](/assets/screenshots/admin_fetch_user.PNG)

- **Create User Data**

    - URL: `/admin/v1/user`
    - Method: `POST`
    - Description: Creates a new user.
    - Headers:
        - `authorization` (required): jwt token from Login API
    - Request Body:
    - `username` (required): Username of the new user.
    - `password` (required): Password of the new user.
    - `email` (required): Email address of the new user.
    - `fullName` (required): Full name of the new user.
    - `membership` (optional): Membership status of the new user.

- **Update User Data**

    - URL: `/admin/v1/user/:id`
    - Method: `PUT`
    - Description: Updates an existing user's data.
    - Headers:
        - `authorization` (required): jwt token from Login API
    - Request Parameters:
    - `id` (required): ID of the user to be updated.
    - Request Body:
    - Any fields to be updated (e.g., `username`, `password`, `email`, `fullName`, `membership`).

- **Delete User Data**

    - URL: `/admin/v1/user/:id`
    - Method: `DELETE`
    - Description: Deletes an existing user.
        - Headers:
            - `authorization` (required): jwt token from Login API- Request Parameters:
    - `id` (required): ID of the user to be deleted.

### Admin Category Management API

- **Fetch Category List**

    - URL: `/admin/v1/category`
    - Method: `GET`
    - Description: Fetches a list of all category.
    - Headers:
        - `authorization` (required): jwt token from Login API

- **Create Category Data**

    - URL: `/admin/v1/category`
    - Method: `POST`
    - Description: Creates a new category.
    - Headers:
        - `authorization` (required): jwt token from Login API
    - Request Body:
    - `name` (required): Name of the category.
    - `description` (required): Description of the category.
    - `activated` (required): boolean. true/false

- **Update Category Data**

    - URL: `/admin/v1/category/:id`
    - Method: `PUT`
    - Description: Updates an existing category's data.
    - Headers:
        - `authorization` (required): jwt token from Login API
    - Request Parameters:
    - `id` (required): ID of the category to be updated.
    - Request Body:
    - Any fields to be updated (e.g., `name`, `description`, `activated`).

- **Delete Category Data**

    - URL: `/admin/v1/category/:id`
    - Method: `DELETE`
    - Description: Deletes an existing category.
        - Headers:
            - `authorization` (required): jwt token from Login API- Request Parameters:
    - `id` (required): ID of the category to be deleted.

### Admin Post Management API

- **Fetch Post List**

    - URL: `/admin/v1/category`
    - Method: `GET`
    - Description: Fetches a list of all category.
    - Headers:
        - `authorization` (required): jwt token from Login API

- **Create Post Data**

    - URL: `/admin/v1/category`
    - Method: `POST`
    - Description: Creates a new category.
    - Headers:
        - `authorization` (required): jwt token from Login API
    - Request Body:
    - `name` (required): Name of the category.
    - `description` (required): Description of the category.
    - `activated` (required): boolean. true/false

- **Update Post Data**

    - URL: `/admin/v1/category/:id`
    - Method: `PUT`
    - Description: Updates an existing category's data.
    - Headers:
        - `authorization` (required): jwt token from Login API
    - Request Parameters:
    - `id` (required): ID of the category to be updated.
    - Request Body:
    - Any fields to be updated (e.g., `name`, `description`, `activated`).

- **Delete Post Data**

    - URL: `/admin/v1/category/:id`
    - Method: `DELETE`
    - Description: Deletes an existing category.
        - Headers:
            - `authorization` (required): jwt token from Login API- Request Parameters:
    - Request Parameters:
    - `id` (required): ID of the category to be deleted.

### Admin Payment Management API

- **Fetch Payment List**

    - URL: `/admin/v1/payment`
    - Method: `GET`
    - Description: Fetches a list of all payment.
    - Headers:
        - `authorization` (required): jwt token from Login API

### User Action API
- **Login**:
  - URL: `:url/arrivo/api/v1/login`
  - Method: `POST`
  - Description: Allows users to login and obtain an access token.
  - Body:
    - `username` (required): User username.
    - `password` (required): User password.
  
- **Refresh Token**:
  - URL: `:url/arrivo/api/v1/token/refresh`
  - Method: `POST`
  - Description: Allows users to refresh their access token. Once token is being refreshed, the old token will be expired.
  - Headers:
    - `authorization` (required): jwt token from Login API

### User View Post API
- **Fetch Post List**
    - URL: `/admin/v1/post`
    - Method: `GET`
    - Description: Fetches a list of all post based on user membership.
    - Headers:
        - `authorization` (required): jwt token from Login API
    - Query Parameters:
    - `page` (optional): Pagination count.
    - `count` (optional): Count of post per page.
    - `categoryId` (optional): filter based on category id

- **Fetch Post Details**
    - URL: `/admin/v1/post/:id`
    - Method: `GET`
    - Description: Fetches a post details.
    - Headers:
        - `authorization` (required): jwt token from Login API
    - Query Parameters:
    - `id` (optional): Post Id

### User View Category API
- **Fetch Category List**
    - URL: `/admin/v1/category`
    - Method: `GET`
    - Description: Fetches a list of all category.
    - Headers:
        - `authorization` (required): jwt token from Login API
    - Query Parameters:
    - `page` (optional): Pagination count.
    - `count` (optional): Count of post per page.

- **Fetch Category Details**
    - URL: `/admin/v1/category/:id`
    - Method: `GET`
    - Description: Fetches a category details.
    - Headers:
        - `authorization` (required): jwt token from Login API
    - Query Parameters:
    - `id` (optional): Post Id

### User Payment API
- **Make Payment**:
  - URL: `:url/arrivo/api/v1/payment`
  - Method: `POST`
  - Description: Create Payment url
  
- **Payment Callback**:
  - URL: `:url/arrivo/api/v1/payment/callback`
  - Method: `POST`
  - Description: Callback url provide to billplz to trigger after payment process. If payment success the membership will update as premium
  - Refer to BillPlz Payment Completion X Signature Callback URL
