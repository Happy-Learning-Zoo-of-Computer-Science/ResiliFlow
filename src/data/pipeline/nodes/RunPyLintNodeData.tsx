import {NodeConfig, NodeData} from "../NodeData";

interface RunPyLintNodeConfig extends NodeConfig {
    reportPath: string;
}

class RunPyLintNodeData extends NodeData<RunPyLintNodeConfig> {
    getDefaultLabel() {
        return "Run PyLint";
    }

    protected getDefaultConfig(): RunPyLintNodeConfig {
        return {reportPath: "pylint.log"};
    }
}

export {RunPyLintNodeData};
export type {RunPyLintNodeConfig};
