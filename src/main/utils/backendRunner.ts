import { isDev } from "./utils.js";
import * as child from 'child_process';
import { app } from "electron";
import path from "path";
import kill from "tree-kill";

export function startBackendService(): child.ChildProcess {
    const startProcess = (command: string): child.ChildProcess => {
        const process = child.spawn(command);
        process.stdout!.on('data', (data: string) => {
            console.log("data: ", data.toString());
        });
        process.stderr!.on('data', (data: string) => {
            console.log(`stderr: ${data}`);
        });
        console.log("Python server started");
        return process;
    };

    let python: child.ChildProcess;
    if (isDev()) {
        const backendExecutablePath = process.env.BACKEND_EXECUTABLE_PATH;
        if (!backendExecutablePath) {
            console.error("Error: Environment variable 'BACKEND_EXECUTABLE_PATH' is not set in .env file.");
            process.exit(1);
        }
        console.log(`Starting backend application from: ${backendExecutablePath}`);
        python = startProcess(backendExecutablePath);
    } else {
        const command = path.join(app.getAppPath(), "run");
        python = startProcess(command);
    }
    return python;
}


export function stopBackendService(python: child.ChildProcess): void {
    if (python && python.pid) {
        kill(python.pid);
    }
}