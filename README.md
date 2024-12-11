# ResiliFlow

## Description

ResiliFlow is an Electron application designed to help users create, load, and manage projects with ease. It integrates with various tools and configurations to streamline the development process.

## Features

- Create new projects
- Load existing projects
- Import projects
- Select programming languages and configurations
- Generate pipeline templates
- Edit Pipeline templates
- Integrate with Github CI/CD actions
- Visualize security report
- ~~Learning Hub~~

## Installation

To install and run the application locally, follow these steps:

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/resiliflow.git
   cd resiliflow
   ```

2. Install dependencies:

    ```sh
    npm install
    ```

3. Build the application:

   ```sh
   npm run build
   ```

4. *Package the application for distribution:

    ```sh
    npm run dist:mac-arm
    ```

## Development

1. Create a .env file and include the `BACKEND_EXECUTABLE_PATH` variable. Executables will be created automatically when you push your code to the back-end repository. You can download it from the [web page](https://github.com/Happy-Learning-Zoo-of-Computer-Science/ResiliFlow_back/actions) or by using `gh`.

2. Start the application:

    ```sh
    npm run dev
    ```

3. Use the interface to create, load, or import projects.

## Scripts

- `npm run dev: Run the development server for both React and Electron.`
- `npm run build: Build the React application.`
- `npm run transpile:electron: Transpile Electron files.`
- `npm run dist:mac-arm: Build and package the application for macOS ARM64.`

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

This project is licensed under the ISC License.

```text
Feel free to customize this template to better fit your project's specifics.
```
