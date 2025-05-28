# Book Review Platform

A full-stack web application for book enthusiasts to discover, review, and discuss books. Built with the MERN stack (MongoDB, Express.js, React.js, Node.js).

## Features

- User authentication (signup, login, logout)
- Browse and search books
- Create, read, update, and delete book reviews
- User profiles with review history
- Featured books section
- Latest reviews feed
- Responsive design for all devices

## Tech Stack

### Frontend
- React.js
- Redux Toolkit for state management
- Material-UI (MUI) for UI components
- React Router for navigation
- Axios for API requests

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcrypt for password hashing

## Prerequisites

Before running this project, make sure you have the following installed:
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd book-review-platform
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

## Configuration

1. Create a `.env` file in the backend directory with the following variables:
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

2. Create a `.env` file in the frontend directory:
```
REACT_APP_API_URL=http://localhost:5000/api
```

## Running the Application

1. Start the backend server:
```bash
cd backend
npm start
```

2. Start the frontend development server:
```bash
cd frontend
npm start
```

The application should now be running at:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## Project Structure

```
book-review-platform/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/
│   │   ├── assets/
│   │   └── App.js
│   └── package.json
└── README.md
```

## API Endpoints

### Authentication
- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login user
- GET /api/auth/me - Get current user

### Books
- GET /api/books - Get all books
- GET /api/books/:id - Get book by ID
- POST /api/books - Create new book
- PUT /api/books/:id - Update book
- DELETE /api/books/:id - Delete book

### Reviews
- GET /api/reviews - Get all reviews
- GET /api/reviews/:id - Get review by ID
- POST /api/reviews - Create new review
- PUT /api/reviews/:id - Update review
- DELETE /api/reviews/:id - Delete review

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

allemanikumar363@gmail.com

Project Link: [https://github.com/yourusername/book-review-platform](https://github.com/yourusername/book-review-platform)
