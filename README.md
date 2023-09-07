# Brio-front-end-client


# Brio - Bringing Food Really On Time

The Brio project is a visionary food delivery platform that seeks to redefine the food delivery experience, focusing on user-centric design, functionality, and innovative architecture.

- [Brio - Bringing Food Really On Time](#brio---bringing-food-really-on-time)
  - [Table of Contents](#table-of-contents)
  - [Tech Stack](#tech-stack)
  - [Development Timeline](#development-timeline)
  - [GitHub Repositories](#github-repositories)
  - [Project Preview](#project-preview)
  - [Introduction](#introduction)
  - [Features](#features)
  - [User Interface](#user-interface)
  - [Code Architecture](#code-architecture)
  - [Technologies Used](#technologies-used)
  - [Challenges and Solutions](#challenges-and-solutions)
  - [Conclusion](#conclusion)

## Table of Contents

- [Tech Stack](#tech-stack)
- [Development Timeline](#development-timeline)
- [GitHub Repositories](#github-repositories)
- [Project Preview](#project-preview)
- [Introduction](#introduction)
- [Features](#features)
- [User Interface](#user-interface)
- [Code Architecture](#code-architecture)
- [Technologies Used](#technologies-used)
- [Challenges and Solutions](#challenges-and-solutions)
- [Conclusion](#conclusion)

## Tech Stack

- react
- nodejs
- express
- chakra ui
- swagger
- axios
- refreshtoken
- docker
- eslint
- prettier
- vite
- aos
- javascript
- typescript
- docker-compose
- bcrypt
- dotenv
- leaflet
- mapbox
- quill
- html
- css


## Development Timeline

- **Duration:** Three months

## GitHub Repositories

- [Frontend Repository](https://github.com/brandalx/Brio-front-end-client)
- [Backend Repository](https://github.com/brandalx/Brio-back-end)

## Project Preview

- [Frontend Preview](https://thebrioshop.com/)
- [Backend/API Preview](https://thebrioshop.com/api/)
- [Architecture on Figma](https://www.figma.com/file/2Ux57yeoe6uvWGINK3AIIL/Brio-architecture?type=whiteboard&t=1ZrilNq0NNwPQerP-1)

## Introduction

The Brio project, aptly named  'Brio - Bringing Food Really On Time', is a visionary food delivery platform that embodies efficiency and convenience. The project's primary goal was to create a globally deployable app that redefines the food delivery experience. By focusing on user-centric design, seamless functionality, and innovative architecture, Brio aims to revolutionize the way people interact with food delivery services. The platform is accessible at http://thebrioshop.com, offering both customers and restaurant partners a modern and streamlined solution for food ordering and delivery.

## Features

The Brio project boasts an array of features that cater to the needs of both customers and restaurant partners, creating a seamless and efficient food delivery experience. User Authentication and Management: Brio offers a robust user authentication system that enables users to create accounts, log in securely, and manage their profiles. The project incorporates JSON Web Tokens (JWT) for authentication, ensuring the privacy and security of user information. Efficient Ordering Process: With Brio, customers can effortlessly browse through a diverse selection of restaurants and products. They can add items to their carts and complete orders with just a few clicks. This streamlined ordering process minimizes friction and enhances user satisfaction. Order Tracking System: Brio features a comprehensive order tracking system that empowers customers to monitor the status of their orders in real-time. From the moment an order is placed to its delivery, users gain valuable insights into the progress of their orders. Restaurant and Product Management: For restaurant partners, Brio provides an intuitive interface to manage products, menus, and orders. Restaurants can easily update their menus, add new products, and track incoming orders, ensuring smooth operations and timely deliveries. User-Friendly Interface: Brio's user interface is designed to be intuitive and straightforward, allowing both customers and restaurant partners to access the features they need with ease. The dark theme, loading skeletons, and hover pop-ups contribute to a visually engaging and enjoyable experience. Address Search and Geolocation: Leveraging external APIs like OpenCage and Mapbox, Brio enhances the user experience by offering address search and geolocation services. This enables customers to input accurate delivery addresses and find nearby restaurants based on their location. Interactive Commenting and Liking: Brio encourages engagement by allowing users to leave comments and interact with restaurant reviews. Users can like or dislike comments, fostering a sense of community and feedback among customers. Promotions and Discounts: The platform supports promotions and discounts, enhancing customer loyalty and encouraging repeat orders. Admins can create and manage promotions that are visible to customers during the ordering process. Responsive Design: Brio is fully responsive across various devices, including PCs, tablets, and mobile phones. This responsive design ensures that users can access and enjoy the platform's features seamlessly, regardless of their preferred device. Admin Dashboard: Brio's admin dashboard offers restaurant partners an overview of their products, orders, and revenue. The dashboard empowers restaurant owners to efficiently manage their business operations and make data-driven decisions. Password Recovery and Security: The project features a secure password recovery process that allows users to regain access to their accounts. Security measures like password hashing with Bcrypt and email verification contribute to a safe user experience. Data Visualization: Brio leverages Chart.js to visualize data, particularly in the admin dashboard. This feature enables restaurant partners to gain insights into their business performance at a glance. These features collectively contribute to Brio's mission of delivering food really on time while providing an enjoyable and hassle-free experience for both customers and restaurant partners

## User Interface

The user interface for Bank Global includes full prepared layout in figma and the site itself. I included various screenshots and images highlighting unique design choices and particularly complex features that required a lot of UI work. You can see full layout of "The Bank Global" in its figma file

## Code Architecture

The Brio project's code architecture and container orchestration strategy are designed to ensure efficient deployment, scalability, and seamless interaction between its frontend and backend components. Dockerization: Docker is utilized to containerize the Brio project's frontend and backend components, enabling consistent deployment across various environments. The Dockerfiles for the server and frontend components define the necessary steps to build and run each container: Server Dockerfile: The server's Dockerfile starts with a base image of node:14-alpine. It sets the working directory to /app, copies the package.json files, installs the dependencies using npm, and copies the rest of the application code. The server exposes port 3001 and starts the application with the node app.js command. Frontend Dockerfile: The frontend's Dockerfile follows a multi-stage build approach. It uses the node:14-alpine image as the build stage to build the React application. After building, the deployment stage uses the nginx:stable-alpine image. The built files are copied from the build stage to the Nginx container's /usr/share/nginx/html directory. Nginx is configured to listen on port 80 and serve the static files. The Nginx configuration file is also copied to the container. Docker Compose: The Docker Compose configuration file (docker-compose.yml) defines the services, networks, and dependencies for the Brio project. It orchestrates the deployment of the frontend and backend containers and ensures their proper interaction: Frontend Service: The frontend service is built from the frontend's Docker image. It exposes ports 80 and 443 and sets various environment variables required for the frontend's operation, such as API URLs and Mapbox tokens. The service uses a volume to include the Nginx configuration file and Let's Encrypt certificates for secure communication (HTTPS). Server Service: The server service is built from the server's Docker image. It defines environment variables for the server's configuration, including database URLs, authentication tokens, and ports. The service also uses a volume to include static files. Networks: The app-network network is created to facilitate communication between the frontend and backend containers. This network enables them to interact seamlessly using container names as hostnames. Nginx Configuration: The Nginx configuration file (nginx.conf) plays a critical role in the project's deployment and communication: The first server block listens on port 80 and redirects HTTP traffic to HTTPS using a 301 redirect. The second server block listens on port 443 for HTTPS traffic. It serves the static frontend files and handles API requests. The location / block serves the frontend files, and the location /api block proxies API requests to the backend server. Conclusion: The Brio project's code architecture leverages Docker and container orchestration to achieve consistent and scalable deployment. Docker allows the isolation of frontend and backend components, while Docker Compose facilitates their coordinated deployment. The Nginx configuration ensures secure communication and proper routing between the frontend and backend. This architecture enhances the project's maintainability, scalability, and overall performance.

## Technologies Used

Brio stands as a state-of-the-art food delivery platform, underpinned by a meticulously selected array of advanced technologies. The frontend, a dynamic and responsive user interface, relies on React in conjunction with Vite for rapid development. This is fortified by Chakra UI, which accelerates UI design, and Axios, which enhances data interaction efficiency. Chart.js and Leaflet contribute to the platform's data visualization and geolocation capabilities, while the integration of Spline Tool for React adds an interactive 3D element. AOS brings animation to the user experience, amplifying engagement. The backend is constructed upon Node.js and Express, a powerful combination that facilitates the event-driven server logic. MongoDB, the NoSQL database, ensures efficient data storage and retrieval. Authentication and security are bolstered by JSON Web Token (JWT) and Bcrypt, respectively handling secure authentication processes and password encryption. Dotenv handles environment variables, fortifying security, and scalability. CORS ensures controlled cross-origin requests. The incorporation of SendGrid, Multer, and Swagger further streamlines functionalities, creating a secure, efficient, and comprehensive food delivery ecosystem. This technology amalgamation positions Brio at the forefront of innovation within the food delivery industry

## Challenges and Solutions

Brio's comprehensive technology stack addresses a range of challenges across the platform. On the frontend, React and Vite deliver a responsive and dynamic interface, while Chakra UI streamlines UI design. Axios facilitates efficient data communication, and Chart.js enhances data visualization. Leaflet empowers location-based features, and Spline Tool integration brings interactive 3D models to the forefront. AOS animations contribute to a visually engaging experience, enhancing user immersion. On the backend, Node.js and Express form the core server architecture, delivering robust and efficient server-side logic. MongoDB offers a scalable and efficient NoSQL data storage solution, while JSON Web Token (JWT) and Bcrypt ensure secure authentication and password protection. Dotenv manages environment variables, optimizing security and scalability. DevOps is a critical facet of Brio's success, with Docker and Docker Compose orchestrating containerization and deployment. The use of NGINX adds load balancing and enhances security, ensuring seamless scaling and enhanced user experience. The platform's architecture is further bolstered by Digital Ocean, which provides a reliable and scalable cloud infrastructure.

## Conclusion

Brio Technologies Overview: Brio represents a cutting-edge food delivery platform, characterized by a meticulously curated selection of advanced technologies spanning frontend, backend, and DevOps. The frontend boasts a dynamic interface powered by React and Vite, with Chakra UI accelerating UI development and Axios optimizing data interactions. Chart.js and Leaflet enrich the platform's data visualization and geolocation capabilities, and the integration of Spline Tool for React introduces captivating 3D models. AOS animations enhance user engagement, ensuring an immersive experience. Solutions: Brio's comprehensive technology stack addresses a range of challenges across the platform. On the frontend, React and Vite deliver a responsive and dynamic interface, while Chakra UI streamlines UI design. Axios facilitates efficient data communication, and Chart.js enhances data visualization. Leaflet empowers location-based features, and Spline Tool integration brings interactive 3D models to the forefront. AOS animations contribute to a visually engaging experience, enhancing user immersion. On the backend, Node.js and Express form the core server architecture, delivering robust and efficient server-side logic. MongoDB offers a scalable and efficient NoSQL data storage solution, while JSON Web Token (JWT) and Bcrypt ensure secure authentication and password protection. Dotenv manages environment variables, optimizing security and scalability. DevOps is a critical facet of Brio's success, with Docker and Docker Compose orchestrating containerization and deployment. The use of NGINX adds load balancing and enhances security, ensuring seamless scaling and enhanced user experience. The platform's architecture is further bolstered by Digital Ocean, which provides a reliable and scalable cloud infrastructure. Conclusion: Brio's technology ecosystem encompasses frontend, backend, and DevOps components, strategically selected to provide a seamless and secure food delivery experience. By combining innovative frontend technologies with a robust backend architecture and efficient DevOps practices, Brio has transformed the food delivery landscape. The platform is poised to revolutionize user engagement, operational efficiency, and partner collaboration, making it a pioneering solution in the industry.
