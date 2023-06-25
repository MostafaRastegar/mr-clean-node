#!/bin/bash

# Convert subdirectory_name to uppercase
subdirectory_name_uppercase=$(echo "$subdirectory_name" | tr '[:lower:]' '[:upper:]')


# Get the name of the subdirectory from user input
read -p "Enter the name of the new api rout: " api_rout_name

# Create the subdirectory inside the core directory
mkdir -p src/core/$api_rout_name

# Create subdirectories inside the subdirectory
mkdir -p src/core/$api_rout_name/controllers
mkdir -p src/core/$api_rout_name/models
mkdir -p src/core/$api_rout_name/services

# Create the routes ts file inside the subdirectory
touch src/core/$api_rout_name/${api_rout_name}Routes.ts

# Create the infrastructures directory
mkdir -p src/infrastructures/$subdirectory_name_uppercase
touch src/infrastructures/$api_rout_name/${subdirectory_name_uppercase}Repository.ts
touch src/infrastructures/$api_rout_name/${subdirectory_name_uppercase}RepositoryModel.ts