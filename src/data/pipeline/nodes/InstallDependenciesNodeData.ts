import {NodeConfig, NodeData} from "../NodeData";

interface InstallDependenciesNodeConfig extends NodeConfig {
    requirements: string;
    additionalPackages: string;
}

class InstallDependenciesNodeData extends NodeData<InstallDependenciesNodeConfig> {
    getDefaultLabel() {
        return "Install Dependencies";
    }

    protected getDefaultConfig(): InstallDependenciesNodeConfig {
        return {
            requirements: "requirements.txt",
            additionalPackages: "pandas numpy matplotlib",
        };
    }
}

export {InstallDependenciesNodeData};
export type { InstallDependenciesNodeConfig };
