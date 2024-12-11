import {NodeConfig, NodeData} from "../NodeData";

interface SetupPythonNodeConfig extends NodeConfig {
    pythonVersion: string;
}

class SetupPythonNodeData extends NodeData<SetupPythonNodeConfig> {
    getDefaultLabel() {
        return "Setup Python";
    }

    protected getDefaultConfig(): SetupPythonNodeConfig {
        return {pythonVersion: "3.8"};
    }
}

export {SetupPythonNodeData};
export type { SetupPythonNodeConfig };
