# ResiliFlow

## Description

ResiliFlow is an Electron application designed to help users create, load, and manage projects with ease. It integrates with various tools and configurations to streamline the development process.

## Features

- Create new projects
- Load existing projects
- Import projects
- Select programming languages and configurations
- Generate pipeline using pre-defined templates
- Edit pipelines
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
    # Node.js version 23.1.0
    npm install
    ```

3. Build the application:

   ```sh
   npm run build
   ```

4. Install the [backend](https://github.com/Happy-Learning-Zoo-of-Computer-Science/ResiliFlow_back/tree/v1.0.0):
    ```sh
    cd ..
    git clone https://github.com/Happy-Learning-Zoo-of-Computer-Science/ResiliFlow_back.git
    cd resiliflow_back
    ```

5. Install dependencies:
    ```sh
    # Python version 3.12.1
    # Use virtual environment if you want.
    pip install requirements.txt
    ```

6. Start backend service:
    ```sh
    python app.py
    ```

7. Start frontend service:
    ```sh
    cd ../resiliflow
    npm run dev
    ```

We don't have the Apple developer sign now, so we can not release the executable version.

## How to use

Watch the [demo](https://youtu.be/1McI_sbkJ5g​).

## Test

### Unit test
1. Clone the repository and install dependencies.

2. Direct to the project folder.

3. Run unit tests:
    ```sh
    npm run test
    ```

4. If the test fails, please check is port 5000 occupied.

## Development

To run this program in development environment, Choose either methods below:

## Scripts

- `npm run dev: Run the development server for both React and Electron.`
- `npm run build: Build the React and Electron application.`
- `npm run dist:mac-arm: Build and package the application for macOS ARM64.`
- `npm run test: Test the project`

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

This project is licensed under the ISC License.

```text
Feel free to customize this template to better fit your project's specifics.
```
