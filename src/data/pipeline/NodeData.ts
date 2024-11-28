class NodeData {
    id: string;
    label: string;
    position: Position;
    config: Record<string, any>;

    constructor(id: string, label: string, position: Position, config: Record<string, any>) {
        this.id = id;
        this.label=label;
        this.position = position;
        this.config = config;
    }
}