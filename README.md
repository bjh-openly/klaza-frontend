# klaza-frontend

This repository contains the rebuilt Klaza mobile frontend using the Expo-managed React Native stack. It includes the basic scaffolding to run the app locally and add new features.

## Getting started

1. Ensure you are using **Node.js 20.19.4+** (React Native 0.82 enforces this and yarn will fail to install packages on older versions). If you use `nvm`, run:

   ```bash
   nvm use
   ```

   Otherwise install Node 20 manually from <https://nodejs.org/en>.

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm start
   ```

   Use the Expo Go app on a device or an emulator to open the project. The Metro bundler will provide a QR code and platform-specific options.

4. Run tests:

   ```bash
   npm test
   ```

The project uses Expo SDK 51 with React Native. Update the configuration in `app.json` as needed for platform settings.
