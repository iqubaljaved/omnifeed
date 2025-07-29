# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.

## Running the app locally

1. Install dependencies:
   ```bash
   npm install
   ```
2. Run the development server:
   ```bash
   npm run dev
   ```
This will start the application on `http://localhost:9002`.

## Deploying to Firebase App Hosting

This application is configured to be deployed to Firebase App Hosting.

### One-Time Setup

1.  **Install Firebase CLI:** If you don't have it installed, open your terminal and run:
    ```bash
    npm install -g firebase-tools
    ```
2.  **Log in to Firebase:**
    ```bash
    firebase login
    ```
    This will open a browser window for you to log in with your Google account.
3.  **Initialize Firebase:** (You only need to do this once per project)
    Run the following command in your project's root directory:
     ```bash
    firebase init
    ```
    - Select **"Use an existing project"** and choose your Firebase project.
    - When asked about App Hosting, select **"yes"** and follow the prompts. You can accept the default region.

### Deploying Your Application

Once the one-time setup is complete, you can deploy your application any time by running the deployment script from your project's root directory:

```bash
./deploy.sh
```

This script will build your Next.js application and deploy it to Firebase App Hosting. After a few moments, the command will output the URL of your live website.
