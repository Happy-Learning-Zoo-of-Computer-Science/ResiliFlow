class NodeData {
    id: string;
    position: Position;
    config: Record<string, any>;

    constructor(id: string, position: Position, config: Record<string, any>) {
        this.id = id;
        this.position = position;
        this.config = config;
    }
}