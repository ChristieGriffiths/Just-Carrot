# JustCarrot.co.uk

## Description

JustCarrot.co.uk is a solo project aimed to assist users in changing their habits. Users can set goals with time limits and monetary incentives. On successfully completing the challenge, they get their money back; otherwise, the money is donated to a charity of their choice.

**Note**: 
- The payment feature is currently set up in test mode. For testing, you can use the fake credit card number `4242 4242 4242 4242` with expiry date `04/24` and CVC `424`.
- The site is not yet protected against script injection vulnerabilities, so please refrain from entering personal details.

### Technologies Used

- Frontend: React, and other React-based libraries
- Backend: Node.js, Express, MongoDB
- Additional Libraries: Stripe for payment, JWT for authentication, nodemailer for emails

---

## Installation

Before you proceed, make sure you have Node.js and npm installed on your machine.

### Clone the Repository

```bash
git clone <repository_url>
```

### Backend Setup

1. Navigate to the backend directory:

    ```bash
    cd api
    ```

2. Install the required packages:

    ```bash
    npm install
    ```

3. Set your JWT Secret and start the server:

    ```bash
    JWT_SECRET=SUPER_SECRET npm start
    ```

### Frontend Setup

1. Navigate to the frontend directory:

    ```bash
    cd frontend
    ```

2. Install the required packages:

    ```bash
    npm install
    ```

3. Start the React development server:

    ```bash
    npm start
    ```

---

## Code Structure

### Frontend

- **React Components**: Located in `<project_root>/frontend/src/components`

### Backend

- **API Endpoints**: Defined in `<project_root>/api/routes`
- **Database Models**: Mongoose models are in `<project_root>/api/models`
- **Middleware**: Custom middleware functions are in `<project_root>/api/middleware`

