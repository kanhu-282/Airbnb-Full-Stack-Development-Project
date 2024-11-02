# wanderlust-
Airbnb Full-Stack Development Project
This project is a full-stack Airbnb clone built using the MERN stack (MongoDB, Express.js, React, and Node.js). It aims to replicate essential features of a booking platform, including browsing, filtering, and booking listings. Additionally, the application incorporates an interactive location map feature that allows users to view the geographical location of listings. The project is structured with an MVC (Model-View-Controller) architecture to ensure maintainable and scalable code.

#Features:-
> User Authentication: Secure login and registration with JWT.
> Listing Management: Users can add, edit, or delete property listings.
> Search and Filter Functionality: Allows users to filter listings based on criteria like location, price, and amenities.
> Booking System: Integrated booking functionality to check and reserve available listings.
> Interactive Location Map: Each listing includes a map showing its location, enhancing user experience by helping users visualize where properties are situated.
> Responsive Design: Optimized for both mobile and desktop.

#Tech Stack:-
> Frontend: React.js, with React Router for navigation and Axios for API communication.
> Backend: Node.js and Express.js, organized in the MVC structure.
> Database: MongoDB, using Mongoose for data modeling.
> Map API: Integrated a map API (e.g., Google Maps API or Mapbox) to display listing locations.
> API: RESTful API structure.

#Usage of map Function:-
> The map function is employed in multiple areas to render dynamic data efficiently:
> Listings: Used to iterate over fetched data and render each listing on the page.
> Location Map: Used to plot multiple listings on the map, dynamically displaying markers for each property.
> Filters: Renders available filter options dynamically based on property attributes.
> Bookings: Displays all user bookings on their profile.
> 
# Interactive Map Feature
> The interactive map feature leverages a map API, allowing users to:
> View the exact location of each listing.
> Explore nearby areas and amenities.
> Interact with map markers to see more information about the property.

#Project Structure:-

├── controllers       # Business logic for handling requests

├── init              # Initialization scripts (e.g., database connection)

├── models            # Mongoose schemas for database models (User, Listing, Booking)

├── public            # Public assets for frontend (images, styles)

├── routes            # API routes connecting endpoints to controllers

├── utils             # Helper functions (e.g., data validation)

├── views             # HTML views for server-side rendering (if applicable)

├── .env              # Environment variables for secure configuratio

├── app.js            # Main application file, server setup

├── cloudConfig.js    # Cloud service configuration (e.g., image storage)

├── middleware.js     # Custom middleware, e.g., for authentication

├── package.json      # Project dependencies and scripts

└── schema.js         # Schema configuration or database setup
