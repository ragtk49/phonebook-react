# Phonebook React App

This is a simple phonebook application built using React for the front-end and Node.js with Express for the back-end. The application allows users to store and manage their contacts using a JSON-based data format.

## Deployed
App is deployed at https://render-test-7njr.onrender.com/

## Features

- Add new contacts with details such as name, and phone number.
- Delete contacts that are no longer needed.
- Search for specific contacts by name or phone number.
- View a list of all contacts in the phonebook.

## Prerequisites

Before running the phonebook app, ensure that you have the following installed:

- Node.js: Version 12 or higher.
- NPM: Node Package Manager, which is bundled with Node.js.

## Getting Started

To run the phonebook app locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone <repository_url>
   ```

2. Navigate to the project directory:

   ```bash
   cd phonebook-react-app
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Start the server:

   ```bash
   npm start
   ```

   This will start the backend server on `http://localhost:3001`.

5. In a new terminal, navigate to the `client` directory:

   ```bash
   cd client
   ```

6. Install the client dependencies:

   ```bash
   npm install
   ```

7. Start the React development server:

   ```bash
   npm start
   ```

   This will start the React app on `http://localhost:3000` and automatically open it in your default browser.

## Usage

Once the phonebook app is running, you can interact with it using your web browser.

1. Open your browser and go to `http://localhost:3000` (if it's not already open).
2. You will see the phonebook interface, where you can view and manage your contacts.
3. To add a new contact, click on the "Add Contact" button and fill in the required fields.
5. To delete a contact, click on the contact's name in the list and then click on the "Delete" button.
6. To search for a specific contact, type the name or phone number in the search bar at the top.

## Backend API

The back-end of the phonebook app exposes the following API endpoints:

- `GET /api/persons`: Retrieves all contacts.
- `POST /api/persons`: Adds a new contact.
- `GET /api/persons/:id`: Retrieves a specific contact by ID.
- `DELETE /api/persons/:id`: Deletes a specific contact by ID.

The data is stored in a JSON format on the server.

## Technologies Used

The phonebook app utilizes the following technologies:

- React: A JavaScript library for building user interfaces.
- Node.js: A JavaScript runtime for server-side development.
- Express: A fast and minimalist web framework for Node.js.
- JSON: A lightweight data interchange format.

## Contributing

Contributions to the phonebook app are welcome! If you find any issues or want to add new features, please feel free to submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

This app was created as a simple demonstration of building a full-stack application using React and Node.js. Feel free to modify and expand upon it