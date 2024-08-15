# Gilded Sentinel - Client Monitoring Platform

Gilded Sentinel is a powerful and intuitive client data monitoring platform built using React. The UI integrates with a Spring/Java backend and a C-based data collection client, providing detailed system information and monitoring capabilities. This platform supports both standard systems and those with Integrated Lights-Out (ILO) capabilities, with future plans for DRAC and other remote management systems.

## Table of Contents
- [Gilded Sentinel - Client Monitoring Platform](#gilded-sentinel---client-monitoring-platform)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Project Structure](#project-structure)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
  - [Usage](#usage)
  - [Configuration](#configuration)
  - [Technologies Used](#technologies-used)

## Features
- **System Monitoring:** Real-time CPU, memory, and GPU data collection and display.
- **Temperature Graphs:** Visualize CPU temperature data over time.
- **ILO Support:** Monitor and manage ILO-enabled systems, with options for configuration and overrides.
- **Responsive UI:** Designed for use across various devices and screen sizes.
- **Future Expansion:** Planned support for DRAC and other remote management technologies.

## Project Structure
```
gilded-sentinel/
├── node_modules/
├── public/
│ ├── favicon.ico
│ ├── apple-touch-icon.png
│ ├── favicon-16x16.png
│ ├── favicon-32x32.png
│ ├── android-chrome-192x192.png
│ ├── android-chrome-512x512.png
│ ├── index.html
│ └── site.webmanifest
├── src/
│ ├── components/
│ │ └── subcomponent/
│ ├── hooks/
│ ├── styles/
│ ├── types/
│ ├── utils/
│ ├── App.tsx
│ └── index.tsx
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

## Installation
1. **Clone the Repository:**
    ```bash
    git clone https://github.com/laurus-industries/gilded-sentinel.git
    cd gilded-sentinel
    ```

2. **Install Dependencies:**
    Ensure Node.js and npm are installed, then run:
    ```bash
    npm install
    ```

## Running the Application
- **Development Server**
    To start the app in development mode with hot-reloading:
    ```bash
    npm start
    ```
    Visit `http://localhost:3000` in your browser to view it.

- **Build for Production**
    To create a production build of the app:
    ```bash
    npm run build
    ```
    This command generates a build directory containing the optimized application ready for deployment.

## Usage
- **Monitoring Systems**
    - **Home Page:** Lists all connected systems, including real-time data on CPU, memory, and GPU usage.
    - **System Details:** Click on a system to view detailed information, including CPU temperatures over time, clock speeds, and memory stats.
    - **ILO Support:** For systems with ILO, you can monitor and configure the ILO settings directly through the app.

- **Routing**
    - **Home Page (/):** Displays the list of all systems.
    - **System Detail Page (/client/:id):** Shows detailed stats for a specific system.

## Configuration
The API endpoint for data collection is hardcoded within `App.tsx`. Modify the `API_URL` variable directly within this file if needed:
```typescript
export const API_URL = 'http://localhost:32550'; // Update this URL as necessary
```

## Technologies Used
React: The core framework for building the user interface.  
TypeScript: Enforced type safety for more maintainable and reliable code.  
React Router: Enables routing within the application.  
Axios: Simplified HTTP client for data fetching.  
Chart.js & React-Chartjs-2: Used to visualize CPU temperatures and other metrics.  
Spring/Java Backend: Manages data aggregation and API endpoints.  
C-based Data Collection Client: Collects client system data using LibreHardwareMonitor.