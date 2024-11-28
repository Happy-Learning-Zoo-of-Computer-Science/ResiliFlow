import React from "react";
import {Collapse, Space} from "antd";

import "../../assets/css/pipeline/PipelineEditor.css"
import EditableField from "../../components/text/EditableField";
import Node from "../../components/pipeline/node/Node";

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

// TODO: remove this when merging into main!
let data: Array<NodeData> = [
    {
        id: "1",
        label: "Set up environment",
        position: {x: 0, y: 0},
        config: {"fuck": "shit", "ass": "hole"}
    },
    {
        id: "2",
        label: "Install dependencies",
        position: {x: 0, y: 0},
        config: {"fuck2": "shit2"}
    },
    {
        id: "3",
        label: "Run pylint",
        position: {x: 0, y: 0},
        config: {"fuck3": "shit3", "ass3": "hole3", "shit3": "fuck3", "hole3": "ass3"}
    },
]

const PipelineEditor: React.FC = () => {
    return (
        <Space direction="horizontal">
            <Space direction="vertical" className="phase-space">
                <EditableField inputWidth={300} initialValue={"Phase 1"} onSave={() => {}}/>
                {data.map((item) => (
                    <Node data={item}/>
                ))}
            </Space>
        </Space>
    )
}

export default PipelineEditor;