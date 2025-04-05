# Rick and Morty App

This is a web application built with Next.js, Chakra UI, and Apollo Client. It allows users to explore characters from the Rick and Morty universe, view detailed character information, and manage user settings.

## Features

- **Authentication**: Users can log in and log out.
- **Character Display**: Browse and view detailed information about characters.
- **Pagination**: Navigate through pages of characters.
- **User Settings**: Edit and save user details like username and job title.
- **Dark Mode**: Toggle between light and dark themes.
- **Error Handling**: Graceful error handling with retry options.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **UI Library**: [Chakra UI](https://chakra-ui.com/)
- **GraphQL Client**: [Apollo Client](https://www.apollographql.com/docs/react/)
- **State Management**: React Context API
- **Validation**: [Vest](https://vestjs.dev/)
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/)

## Project Structure
```
src/
├── app/                # Next.js app directory (pages, routes, etc.)
├── components/         # Reusable UI components (buttons, forms, etc.)
├── consts/             # Constants used across the app (e.g., API URLs, default values)
├── hooks/              # Custom React hooks for managing state and effects
├── lib/                # Library configurations (e.g., Apollo Client, Firebase)
├── utils/              # Utility functions (helpers, formatters, etc.)
```


## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/leonardo.git
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## 🏗️ Build

To build the project for production:

```bash
npm run build
# or
yarn build
```

To start the production server:

```bash
npm run start
# or
yarn start
```

## 📝 Available Scripts

- `npm run dev` - Start the development server with Turbopack
- `npm run build` - Build the project for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code linting


## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
