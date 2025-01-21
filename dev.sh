#!/bin/bash

# Script: Build project, rebuild Docker Compose, and restart services

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No color

echo -e "${GREEN}Deleting the dist directory...${NC}"
if [ -d "dist" ]; then
    rm -rf dist
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}dist directory deleted successfully.${NC}"
    else
        echo -e "${RED}Failed to delete the dist directory! Exiting.${NC}"
        exit 1
    fi
else
    echo -e "${GREEN}dist directory does not exist. Skipping deletion.${NC}"
fi

echo -e "${GREEN}Building the project with npm...${NC}"
npm run build

if [ $? -eq 0 ]; then
    echo -e "${GREEN}Project built successfully.${NC}"
else
    echo -e "${RED}Project build failed! Exiting.${NC}"
    exit 1
fi

echo -e "${GREEN}Stopping running containers...${NC}"
docker-compose down

if [ $? -eq 0 ]; then
    echo -e "${GREEN}Containers stopped successfully.${NC}"
else
    echo -e "${RED}Failed to stop containers! Exiting.${NC}"
    exit 1
fi

echo -e "${GREEN}Rebuilding and starting Docker Compose services with no cache...${NC}"
docker-compose build --no-cache
docker-compose up -d

if [ $? -eq 0 ]; then
    echo -e "${GREEN}Services rebuilt and started successfully!${NC}"
else
    echo -e "${RED}Failed to rebuild and start services! Exiting.${NC}"
    exit 1
fi

# Optional: Show the status of the containers
echo -e "${GREEN}Showing the status of Docker containers:${NC}"
docker-compose ps
