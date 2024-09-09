# Lab Reporting System

This project is a Java + Spring web application designed for lab reporting. The system allows users to manage various aspects of lab reports through a front-end interface built with React. It supports different entities such as reports, patients, and lab technicians.

![2024-09-09 19-52-08](https://github.com/user-attachments/assets/adc7a698-2168-4e35-aac9-c0353cd5f156)

## Requirements

- **Java + Spring** (JDK 22)
- **PostgreSQL**
- **Maven**
- **React + Vite**
- **Node.js**

## Tech Stack

- **Java + Spring**
- **PostgreSQL**
- **JPA**
- **Maven**
- **Lombok**
- **React + Vite**
- **HTML, CSS, JavaScript**

## Getting Started

### 1. Install Prerequisites

Ensure you have the following installed and added to your PATH:
- Java (JDK 22)
- Node.js
- Maven
- PostgreSQL

  
### 2. Setup the Database

1. **Create a Database in PostgreSQL.**
2. **Configure the Database Connection**:
   - Open the `application.properties` file.
   - Update the following properties with your database details:
     ```properties
     spring.datasource.url=jdbc:postgresql://localhost:5432/labreportingapp  # Name of your database
     spring.datasource.username=username  # Your database username
     spring.datasource.password=password  # Your database password
     ```

### 3. Build and Run the Backend

1. **Download the Project**:
   - Clone or download the project from [GitHub](https://github.com/erenculhaci/Lab-Reporting-App) and extract the zip file.

2. **Build the Backend**:
   - Open a command prompt and navigate to the project directory:
     ```bash
     cd C:\Users\erenc\Desktop\Lab-Reporting-App-main\Lab Reporting App
     ```
   - Build the project using Maven:
     ```bash
     mvn clean install
     ```

3. **Start the Backend**:
   - Run the backend server:
     ```bash
     mvn spring-boot:run
     ```

### 4. Build and Run the Frontend

1. **Navigate to the Frontend Directory**:
   - Open a new command prompt and change the directory to the frontend folder:
     ```bash
     cd C:\Users\erenc\Desktop\Lab-Reporting-App-main\Lab Reporting App Front-End
     ```

2. **Install Dependencies**:
   - Install the required npm packages:
     ```bash
     npm install
     ```

3. **Start the Frontend**:
   - Run the frontend development server:
     ```bash
     npm run dev
     ```

### 5. Access the Application

- The back-end will be accessible at [http://localhost:8080](http://localhost:8080).
- The front-end will be accessible at [http://localhost:5173](http://localhost:5173).

Open [http://localhost:5173](http://localhost:5173) in your browser to access the login page.

### 6. Default Users

The project includes two default users:

- **Admin User**:
  - Username: `admin`
  - Password: `admin123`
  - Role: `ROLE_ADMIN`

- **Standard User**:
  - Username: `user`
  - Password: `user123`
  - Role: `ROLE_USER`

### 7. User Roles and Permissions

- **Admin Users**:
  - Have full access to all endpoints, including CRUD operations and administrative functions.
  - Can manage all entities, including patients, reports, lab technicians, and users.
  - Can create users with `ROLE_ADMIN` role which are admin accounts.
  - Can use update, delete or fetch all methods.

- **Standard Users**:
  - Have restricted access and cannot perform administrative functions.
  - Can create users and can create, search, and view patients, reports, and lab technicians, but cannot create or manage admin accounts or utilize update, delete, and fetch all functions.
  - Can create only users with `ROLE_USER` role.

### 8. Functionality
- **Login**:
  - You can login with username and password, if there is a matching user in the database.
  - The password you've created in the users page is encrypted in database.
  - You can logout and login with different accounts.
     
- **Patients**:
  - Create, update, delete, and search for patients.
  - Search by TC number or name.
  - Fetching all patients' information.

- **Reports**:
  - Perform CRUD operations on reports.
  - Search reports by Patient Name or TC number.
  - Search reports by Lab Technician name.
  - Get all the reports' information.
  - Reports are always ordered by their dates on view page.

- **Lab Technicians**:
  - Perform CRUD operations on lab technicians.
  - Search lab technicians by their Id or name.
  - Get all the lab technicians' information.

- **Users**:
  - Create update or delete users.
  - Admins have access to create admin accounts but users do not.
  - Admins can update, delete or fetch the users but users are only able to create users.

---

If you have any questions or run into issues, please open an issue on [GitHub](https://github.com/erenculhaci/Lab-Reporting-App/issues).
