#!/bin/bash


# Get the name of the subdirectory from user input
read -p "Enter the name of the new api rout: " api_rout_name

# Capitalize the first character of api_rout_name
api_rout_name_uppercase=$(echo "$api_rout_name" | awk '{print toupper(substr($0, 1, 1)) substr($0, 2)}')

# Create the subdirectory inside the core directory
mkdir -p src/core/$api_rout_name

# Create subdirectories inside the subdirectory
mkdir -p src/core/$api_rout_name/controllers
touch  src/core/$api_rout_name/controllers/${api_rout_name_uppercase}Controller.ts

mkdir -p src/core/$api_rout_name/models
touch  src/core/$api_rout_name/models/I${api_rout_name_uppercase}Repository.ts
touch  src/core/$api_rout_name/models/I${api_rout_name_uppercase}Service.ts
touch  src/core/$api_rout_name/models/${api_rout_name_uppercase}.ts

mkdir -p src/core/$api_rout_name/services
touch  src/core/$api_rout_name/services/${api_rout_name_uppercase}Service.ts

# Create the routes ts file inside the presentation
touch src/presentation/routers/${api_rout_name}Routes.ts

# Create the infrastractures directory
mkdir -p src/infrastractures/$api_rout_name_uppercase
touch src/infrastractures/$api_rout_name_uppercase/${api_rout_name_uppercase}Repository.ts
touch src/infrastractures/$api_rout_name_uppercase/${api_rout_name_uppercase}RepositoryModel.ts