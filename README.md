# Movie API

This is a simple REST API for managing movies and genres, built with NestJS and MongoDB.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Implemented Functionalities](#implemented-functionalities)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed (v14.x or later)
- MongoDB server running (You can set up a local MongoDB instance or use a cloud-based service like MongoDB Atlas)
- Git installed

## Getting Started

To get this application up and running, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/KaushanF94/movie-api.git
   ```

2. Install dependencies:

   ```bash
   cd movie-api
   npm install
   ```

3. Create a .env file in the root directory of the project with the following content, replacing <YOUR_MONGODB_URI> with your MongoDB connection URI:

   ```bash
   MONGODB_URI=<YOUR_MONGODB_URI>
   ```

4. Start the application:

   ```bash
   npm start
   ```

   The application should now be running locally at http://localhost:3000.

## Implemented Functionalities

This API provides the following functionalities:

- List all movies
- Add a new movie
- Update an existing movie
- Delete a movie
- List all genres
- Add a new genre
- Delete a genre (removes it from movies too)
- Search movies by title or genre

Additionally, it includes the following middleware:

- Request Logging Middleware: Logs incoming requests, including method and URL.

## API Endpoints

- GET /movies: List all movies
- POST /movies: Add a new movie
- PATCH /movies/:id: Update an existing movie
- DELETE /movies/:id: Delete a movie
- GET /genres: List all genres
- POST /genres: Add a new genre
- DELETE /genres/:id: Delete a genre (removes it from movies too)
- GET /movies/:query: Search movies by title or genre

## Usage

You can use tools like Postman or curl to interact with the API endpoints.

Example API request:

```bash
   POST http://localhost:3000/movies
Content-Type: application/json

{
  "title": "Example Movie",
  "description": "This is an example movie",
  "releaseDate": "2023-09-21",
  "genres": ["Action", "Adventure"]
}
```

## Contributing

Contributions to this project are welcome! To contribute, follow these steps:

- Fork the repository.
- Create a new branch for your feature or bug fix.
- Make your changes and commit them.
- Push your changes to your fork.
- Create a pull request to the original repository.

Please ensure that your code follows best practices and includes tests if applicable.

## License

This project is licensed under the MIT License
