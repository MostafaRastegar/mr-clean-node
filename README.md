# mr-clean-node

`mr-clean-node` is a boilerplate for building `Node.js` applications using `Express`, `TypeScript`, and `MongoDB`. It follows a `DDD` architecture pattern to organize your codebase and provides a foundation for creating CRUD operations.

## Directory Structure

The project has the following directory structure:

- **src/core**: Contains the core business logic of the application.
- **src/infrastructures**: Implements the infrastructure layer for isolates the data layer from the rest of the app.
- **src/presentation**: Handles the presentation layer with configurations, middlewares, routers, and utilities.

## Getting Started

To get started with the `mr-clean-node` boilerplate, follow these steps:

1. Clone the repository:

   ```
   git clone https://github.com/MostafaRastegar/mr-clean-node.git
   ```

2. Install dependencies:

   ```
   cd mr-clean-node
   npm install
   ```

3. Set up the database connection:

   - Open `src/presentation/config/database.ts`.
   - Modify the database connection settings according to your MongoDB setup.

4. Run the application:

   ```
   npm start
   ```

   The `server.ts` will start running at `http://localhost:4000`.

## Infrastructures and Repositories

The `src/infrastructures` directory contains the implementation of the infrastructure layer responsible for isolates the data layer from the rest of the app. The repositories within this directory provide the interface for interacting with the database.

### Post Repository

- **File**: `src/infrastructures/Post/PostRepository.ts`
- **Model**: `src/infrastructures/Post/PostRepositoryModel.ts`

The `PostRepository` handles the persistence operations for posts. It provides methods for creating, reading, updating, and deleting post data.

## Creating CRUD Operations (example for blog `Post` )

To create CRUD operations for users and posts, follow these steps:

1. Create a new controller:

   - Navigate to the appropriate directory under `src/core/post`.
   - Create a new controller file (`PostController.ts`).
   - Implement the necessary CRUD methods (create, read, update, delete).

2. Create a new service:

   - Navigate to the corresponding `services` directory under `src/core/post`.
   - Create a new service file (`PostService.ts`).
   - Implement the business logic for the CRUD operations, using the appropriate models and repositories.

3. Create a new router:

   - Navigate to the `routers` directory under `src/presentation`.
   - Create a new router file (`router.ts`).
   - Define the API endpoints and map them to the appropriate controller methods.

4. Register the router:

   - Open `./server.ts`.
   - Import and register the newly created router in the

     ```
     app.use("/api/v1/posts", postRoutes);
     ```

With these steps, you can create CRUD operations for the `posts` by following the DDD architecture pattern.

## Contributing

Contributions are welcome! If you find any issues or want to enhance the boilerplate, feel free to submit a pull request.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
