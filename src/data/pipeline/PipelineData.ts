class PipelineData {
    nodesData: NodeData[];
    connectionsData: ConnectionData[];

    constructor(nodesData: NodeData[] = [], connectionsData: ConnectionData[] = []) {
        this.nodesData = nodesData;
        this.connectionsData = connectionsData;
    }
}