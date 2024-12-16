import {v4 as uuidv4} from 'uuid';

interface NodeConfig {
}

abstract class NodeData<T extends NodeConfig> {
    id: string;
    label: string;
    position: Position;
    config: T;
    inputPort?: string;
    outputPort?: string;

    constructor(
        id: string = "",
        label: string = "",
        position: Position = {x:0, y:0},
        config?: T,
        inputPort: string = "",
        outputPort: string = "",
    ) {
        this.id = id != "" ? id : uuidv4().toString();
        this.label = label;
        this.position = position;
        this.config = config ?? this.getDefaultConfig();
        this.inputPort = inputPort;
        this.outputPort = outputPort;
    }

    protected abstract getDefaultLabel(): string;

    protected abstract getDefaultConfig(): T;

    getLabel(): string {
        if (this.label == "") {
            this.label = this.getDefaultLabel();
        }

        return this.label;
    }
}

export {NodeData};
export type { NodeConfig };
