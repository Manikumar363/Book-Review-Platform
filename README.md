# Book Review Platform

A full-stack web application for book enthusiasts to discover, review, and discuss books. Built with the MERN stack (MongoDB, Express.js, React.js, Node.js).

![Screenshot (458)](https://github.com/user-attachments/assets/644c60dd-c2b9-4185-b077-27202ed1b3df)

## Features

* User authentication (signup, login, logout)
* Browse and search books
* Create, read, update, and delete book reviews
* User profiles with review history
* Featured books section
* Latest reviews feed
* Responsive design for all devices

## Tech Stack

### Frontend

* React.js
* Redux Toolkit for state management
* Material-UI (MUI) for UI components
* React Router for navigation
* Axios for API requests

### Backend

* Node.js
* Express.js
* MongoDB with Mongoose
* JWT for authentication
* bcrypt for password hashing

## Prerequisites

Before running this project, make sure you have the following installed:

* Node.js (v14 or higher)
* MongoDB
* npm or yarn

## Installation

1. Clone the repository:

```bash
git clone https://github.com/Manikumar363/Book-Review-Platform.git
cd Book-Review-Platform
```

2. Install backend dependencies:

```bash
cd backend
npm install # or yarn install
```

3. Install frontend dependencies:

```bash
cd ../frontend
npm install # or yarn install
```

## Configuration

1. Create a `.env` file in the **backend** directory with the following variables:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```
*   `your_mongodb_connection_string`: Replace with your MongoDB connection string (e.g., `mongodb://localhost:27017/bookreviewdb` or your MongoDB Atlas connection string).
*   `your_jwt_secret`: Replace with a strong, random string for JWT signing.

2. Create a `.env` file in the **frontend** directory:

```env
REACT_APP_API_URL=http://localhost:5000/api
```
*   If your backend is running on a different URL/port, update `http://localhost:5000/api` accordingly.

## Running the Application

1. Start the backend server:

```bash
cd backend
npm start # or yarn start
```

2. Start the frontend development server:

```bash
cd ../frontend
npm start # or yarn start
```

The application should now be running at:

*   Frontend: `http://localhost:3000`
*   Backend API: `http://localhost:5000/api`

## API Endpoints

### Authentication

*   `POST /api/auth/register` - Register a new user
*   `POST /api/auth/login` - Login user
*   `GET /api/auth/me` - Get current user (requires authentication)

### Books

*   `GET /api/books` - Get all books
*   `GET /api/books/:id` - Get book by ID
*   `POST /api/books` - Create new book (requires authentication)
*   `PUT /api/books/:id` - Update book by ID (requires authentication)
*   `DELETE /api/books/:id` - Delete book by ID (requires authentication)

### Reviews

*   `GET /api/reviews` - Get all reviews
*   `GET /api/reviews/book/:bookId` - Get reviews for a specific book
*   `GET /api/reviews/user/:userId` - Get reviews by a specific user
*   `GET /api/reviews/:id` - Get review by ID
*   `POST /api/reviews` - Create new review (requires authentication)
*   `PUT /api/reviews/:id` - Update review by ID (requires authentication)
*   `DELETE /api/reviews/:id` - Delete review by ID (requires authentication)

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/your-feature-name`).
3. Commit your changes (`git commit -m 'feat: Add your feature'`).
4. Push to the branch (`git push origin feature/your-feature-name`).
5. Open a Pull Request.

Please ensure your code follows the project's coding standards and includes appropriate tests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For questions or feedback, please contact [allemanikumar363@gmail.com](mailto:allemanikumar363@gmail.com).
