import { app } from "electron";
import path from 'path';
import { isDev } from "./utils.js";


export function getPreloadPath(): string {
    return path.join(app.getAppPath(), isDev() ? "./dist/electron/preload.cjs" : "../dist-react/preload.cjs");
}

export function getRendererPath(): string {
    return path.join(app.getAppPath(), '/dist-react/index.html');
}