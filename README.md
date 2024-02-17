# COMMpay

COMMpay is a cutting-edge solution designed to streamline crypto payments, leveraging the power and flexibility of Nest.js. This platform simplifies the process of integrating cryptocurrency transactions into your business, ensuring security, efficiency, and ease of use.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have the latest version of Node.js and npm installed on your system.

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
Install the dependencies:
bash
Copy code
npm install
Set up your environment variables by creating a .env file in the root directory and configuring it as follows:
makefile
Copy code
# SendGrid Configuration
SENDGRID_API_KEY=<your-sendgrid-api-key>
SENDGRID_SENDER=<your-sendgrid-sender-email>

# Email Configuration
EMAIL_SENDER_ADDRESS=<your-email-sender-address>
EMAIL_SENDER_PASSWORD=<your-email-sender-password>

# Authentication Configuration
JWT_SECRET_KEY=<your-jwt-secret-key>
JWT_TOKEN_TTL=60s

# Common Configuration
WEBSITE_URL=http://localhost:3000

# Database Configuration
DATABASE_NAME=comm
DATABASE_USER=<your-database-user>
DATABASE_PASSWORD=<your-database-password>
PGADMIN_DEFAULT_EMAIL=admin@email.com
PGADMIN_DEFAULT_PASSWORD=qwerty123
```
Replace the placeholders with your actual data.

Start the application:
For development:

```bash
npm run start:dev
```
For production:

```bash
npm run start:prod
```
## Usage
After starting the application, you can access the COMMpay API endpoints through the configured WEBSITE_URL.

Contributing
Please read CONTRIBUTING.md for details on our code of conduct, and the process for submitting pull requests to us.

License
This project is licensed under the UNLICENSED License - see the LICENSE.md file for details.