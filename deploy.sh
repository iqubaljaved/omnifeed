#!/bin/bash
# This script deploys the application to Firebase App Hosting.

echo "Starting deployment to Firebase..."

# The command to deploy the backend to App Hosting.
# The --only flag ensures that only App Hosting resources are deployed.
firebase deploy --only apphosting

echo "Deployment finished."
