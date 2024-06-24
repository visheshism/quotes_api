# Quotes API Documentation

## Introduction
This API serves as the backend for managing inspirational quotes within TodoApp. 
It provides endpoints for retrieving random quotes, managing categories, and creating new quotes.

## Tech Used
- Express.js
- MongoDB

## Installation
To install the necessary dependencies, run the following command:
`npm install`

Start the server:
`npm start`

## API Endpoints
The following are the available endpoints for the API:

### Client
- **GET /api/v1/random**: Get a random quote.
- **GET /api/v1/categ/all**: Retrieve a list of categories.
- **GET /api/v1/categ/:categ_id/quote**: Get a random quote by a specific category.

### Admin
- **POST /API_KEY/categ/:id**: Create a new category.
- **GET /API_KEY/categ/all**: Get a list of all categories.
- **POST /API_KEY/quote/:categ_id/new**: Create a new quote for a specific category.
- **GET /API_KEY/quote/:categ_id/all**: Retrieve all quotes for a category.
- **GET /API_KEY/quote/:quote_id**: Retrieve a specific quote by ID.
- **DELETE /API_KEY/quote/:quote_id**: Delete a specific quote by ID.

## Error Handling
Custom middleware is used to catch errors and send appropriate responses to the user.

## Environment Variables
Please refer to [example.env](example.env) for the required environment variables.

## Acknowledgments
This project was developed by [Vishesh Singh](https://github.com/visheshism).

## License
This project is licensed under the [MIT License](LICENSE).

Feel free to contribute to this project by making a pull request.
