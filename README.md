# Mr. Clean Node

Mr. Clean Node is a boilerplate for building Node.js applications using Express, TypeScript, and MongoDB. It follows a clean architecture pattern to organize your codebase and provides a foundation for creating CRUD operations for users and posts.

## Directory Structure

The project has the following directory structure:

- **src/core**: Contains the core business logic of the application.
- **src/infrastructures**: Implements the infrastructure layer for data persistence.
- **src/presentation**: Handles the presentation layer with configurations, middlewares, routers, and utilities.

## Getting Started

To get started with the Mr. Clean Node boilerplate, follow these steps:

1. Clone the repository:

   git clone <https://github.com/your-username/mr-clean-node.git>

2. Install dependencies:
   cd mr-clean-node
   npm install

3. Set up the database connection:

   - Open `src/presentation/config/database.ts`.
   - Modify the database connection settings according to your MongoDB setup.

4. Run the application:
   npm start

The server will start running at `http://localhost:3000`.

## Infrastructures and Repositories

The `src/infrastructures` directory contains the implementation of the infrastructure layer responsible for data persistence. The repositories within this directory provide the interface for interacting with the database.

### Post Repository

- **File**: `src/infrastructures/Post/PostRepository.ts`
- **Model**: `src/infrastructures/Post/PostRepositoryModel.ts`

The `PostRepository` handles the persistence operations for posts. It provides methods for creating, reading, updating, and deleting post data.

### User Repository

- **File**: `src/infrastructures/User/UserRepository.ts`
- **Model**: `src/infrastructures/User/UserRepositoryModel.ts`

The `UserRepository` handles the persistence operations for users. It provides methods for creating, reading, updating, and deleting user data.

## Creating CRUD Operations

To create CRUD operations for users and posts, follow these steps:

1. Create a new controller:

   - Navigate to the appropriate directory under `src/core`.
   - Create a new controller file (`UserController.ts` or `PostController.ts`).
   - Implement the necessary CRUD methods (create, read, update, delete).

2. Create a new service:

   - Navigate to the corresponding `services` directory under `src/core`.
   - Create a new service file (`UserService.ts` or `PostService.ts`).
   - Implement the business logic for the CRUD operations, using the appropriate models and repositories.

3. Create a new router:

   - Navigate to the `routers` directory under `src/presentation`.
   - Create a new router file (`userRoutes.ts` or `postRoutes.ts`).
   - Define the API endpoints and map them to the appropriate controller methods.

4. Register the router:

   - Open `src/presentation/routers/index.ts`.
   - Import and register the newly created router in the `configureRouters` function.

With these steps, you can create CRUD operations for users and posts by following the clean architecture pattern.

## Contributing

Contributions are welcome! If you find any issues or want to enhance the boilerplate, feel free to submit a pull request.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
