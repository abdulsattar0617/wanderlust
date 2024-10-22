# Wanderlust

Wanderlust is a platform that connects landowners with people seeking to rent outdoor spaces. Whether it's for camping, retreats, or events, Wanderlust makes it easy to discover and book unique lands across the globe.

## Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure (MVC)](#project-structure-mvc)
- [Live Demo](#live-demo)
- [Contributing](#contributing)
- [License](#license)

## About the Project

Wanderlust aims to help users find and rent outdoor spaces for various purposes like camping, retreats, or private events. The platform allows landowners to list their properties and renters to discover and book them through a user-friendly interface.

## Features

- User registration and authentication (login/logout)
- Secure management of user sessions
- Landowners can list their properties for rent
- Renters can search for available properties based on location
- Detailed property pages with images, descriptions, and prices
- Booking system to reserve properties for specific dates
- MVC architecture for scalable and maintainable codebase

## Tech Stack

- **Backend**: Node.js, Express
- **Frontend**: EJS, HTML, CSS
- **Database**: MongoDB
- **Authentication**: Passport.js (for user sessions)
- **View Engine**: EJS (Embedded JavaScript)
- **Version Control**: Git, GitHub

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/abdulsattar0617/wanderlust.git
    cd wanderlust
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Set up environment variables:**
   
   Create a `.env` file in the root directory and add the following:

    ```bash
    PORT=3000
    MONGODB_URI=your-mongodb-uri
    SESSION_SECRET=your-session-secret
    ```

4. **Run the application:**

    ```bash
    npm start
    ```

    Visit `http://localhost:3000` to view the app.

## Usage

Once the app is running locally:

- **Sign up** as a new user.
- **Log in** to explore the platform.
- If you are a **landowner**, list your property for rent.
- If you are a **renter**, search for properties and book them based on availability.

## Live Demo

You can access the live version of the application here: [Wanderlust Live Demo](https://wanderlust-zr73.onrender.com/)

## Project Structure (MVC)

```bash
wanderlust/
│
├── models/             # Data models (e.g., User, Property)
│   ├── user.js
│   └── property.js
│
├── views/              # EJS templates for front-end
│   ├── home.ejs
│   ├── property.ejs
│   └── auth/           # Login, signup templates
│
├── controllers/        # Application logic (routes, handling requests)
│   ├── userController.js
│   └── propertyController.js
│
├── routes/             # Route definitions
│   ├── index.js
│   ├── userRoutes.js
│   └── propertyRoutes.js
│
├── public/             # Static files (CSS, images)
│   ├── styles.css
│   └── images/
│
├── app.js              # Main application file
├── package.json        # NPM dependencies and scripts
└── .env                # Environment variables
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit (`git commit -m 'Add new feature'`).
4. Push to your branch (`git push origin feature-branch`).
5. Open a pull request to the main branch.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

