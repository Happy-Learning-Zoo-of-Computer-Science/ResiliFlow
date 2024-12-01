import { app } from "electron";
import path from 'path';
import { isDev } from "./utils.js";


export function getPreloadPath(): string {
    return path.join(app.getAppPath(), isDev() ? "." : "..", "/build/electron/preload.cjs");
}

export function getRendererPath(): string {
    return path.join(app.getAppPath(), "build/renderer", "index.html");
}