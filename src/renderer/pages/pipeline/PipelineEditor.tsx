import React, {useState} from "react";
import {Space} from "antd";

import "../../assets/css/pipeline/PipelineEditor.css"
import EditableField from "../../components/text/EditableField";
import Node from "../../components/pipeline/node/Node";
import {NodeData} from "../../../data/pipeline/NodeData";
import {SetupPythonNodeData} from "../../../data/pipeline/nodes/SetupPythonNodeData";
import {InstallDependenciesNodeData} from "../../../data/pipeline/nodes/InstallDependenciesNodeData";
import {RunPyLintNodeData} from "../../../data/pipeline/nodes/RunPyLintNodeData";


const PipelineEditor: React.FC = () => {
    let [data, setData] = useState<NodeData<any>[]>([
        new SetupPythonNodeData(),
        new InstallDependenciesNodeData(),
        new RunPyLintNodeData(),
    ]);
    console.log(data)

    return (
        <Space direction="horizontal">
            <Space direction="vertical" className="phase-space">
                <EditableField inputWidth={300} initialValue={"Phase 1"} onSave={() => {
                }}/>
                {data.map((item) => (
                    <Node key={item.id} data={item}/>
                ))}
            </Space>
        </Space>
    )
}

export default PipelineEditor;