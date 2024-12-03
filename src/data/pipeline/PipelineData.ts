import {NodeData} from "./NodeData";

class PipelineData {
    nodesData: NodeData<any>[];
    connectionsData: ConnectionData[];

    constructor(nodesData: NodeData<any>[] = [], connectionsData: ConnectionData[] = []) {
        this.nodesData = nodesData;
        this.connectionsData = connectionsData;
    }
}