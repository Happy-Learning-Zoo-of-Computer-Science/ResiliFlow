import React, {useState} from "react";
import {Button, message, Modal, Space} from "antd";

import "../../assets/css/pipeline/PipelineEditor.css"
import EditableField from "../../components/text/EditableField";
import Node from "../../components/pipeline/node/Node";
import {NodeData} from "../../../data/pipeline/NodeData";
import {SetupPythonNodeData} from "../../../data/pipeline/nodes/SetupPythonNodeData";
import {InstallDependenciesNodeData} from "../../../data/pipeline/nodes/InstallDependenciesNodeData";
import {RunPyLintNodeData} from "../../../data/pipeline/nodes/RunPyLintNodeData";
import Serializer from "../../../util/Serializer";
import TextArea from "antd/es/input/TextArea";


const PipelineEditor: React.FC = () => {
    const [data, setData] = useState<NodeData<any>[]>([
        new SetupPythonNodeData(),
        new InstallDependenciesNodeData(),
        new RunPyLintNodeData(),
    ]);

    const [isSaveModalVisible, setIsSaveModalVisible] = useState(false);
    const [isLoadModalVisible, setIsLoadModalVisible] = useState(false);
    const [yamlContent, setYamlContent] = useState('');

    const handleSave = () => {
        const yamlString = Serializer.serialize(data);
        setYamlContent(yamlString);
        setIsSaveModalVisible(true);
    };

    const handleLoad = () => {
        setYamlContent('');
        setIsLoadModalVisible(true);
    };

    const handleSaveModalOk = () => {
        setIsSaveModalVisible(false);
    };

    const handleLoadModalOk = () => {
        const classMap = {
            SetupPythonNodeData,
            InstallDependenciesNodeData,
            RunPyLintNodeData,
        };
        try {
            // @ts-ignore TODO: solve TS2345 for classMap
            const deserializedData = Serializer.deserialize<NodeData<any>[]>(yamlContent, classMap);
            console.log(deserializedData);

            // Check if deserializedData is an array and not empty
            if (!Array.isArray(deserializedData) || deserializedData.length === 0) {
                throw new Error('Deserialized pipeline is empty or not a valid pipeline.');
            }

            // Check if each item is an instance of NodeData or its subclasses
            const isValidNodeDataArray = deserializedData.every(item => {
                // Since NodeData is abstract, check for required properties
                return item && typeof item.id === 'string' && typeof item.getLabel === 'function';
            });

            if (!isValidNodeDataArray) {
                throw new Error('Deserialized data items are not valid NodeData instances.');
            }
            setData([]);
            setData(deserializedData);
            message.success('Load successfully');
        } catch (error) {
            console.error("Failed to load data from YAML:", error);
            message.error("Failed to load data from YAML: " + (error as Error).message);
        }
    };

    const handleSaveModalCancel = () => {
        setIsSaveModalVisible(false);
    };

    const handleLoadModalCancel = () => {
        setIsLoadModalVisible(false);
    };

    return (
        <Space direction="vertical" style={{width: "100%"}}>
            <Space direction="horizontal" style={{marginBottom: 16}}>
                <Button type="primary" onClick={handleSave}>Save</Button>
                <Button onClick={handleLoad}>Load</Button>
            </Space>
            <Space direction="horizontal">
                <Space direction="vertical" className="phase-space">
                    <EditableField inputWidth={300} initialValue={"Phase 1"} onSave={() => {
                    }}/>
                    {data.map((item) => (
                        <Node key={item.id} data={item}/>
                    ))}
                </Space>
            </Space>
            <Modal
                title="Save YAML"
                open={isSaveModalVisible}
                onOk={handleSaveModalOk}
                onCancel={handleSaveModalCancel}
                footer={[
                    <Button key="copy" onClick={() => {
                        navigator.clipboard.writeText(yamlContent);
                        message.success('已复制到剪贴板');
                    }}>
                        Copy to Clipboard
                    </Button>,
                    <Button key="close" onClick={handleSaveModalCancel}>
                        Close
                    </Button>,
                ]}
                width={800}
            >
                <TextArea
                    rows={20}
                    value={yamlContent}
                    readOnly
                />
            </Modal>
            <Modal
                title="Load YAML"
                open={isLoadModalVisible}
                onOk={handleLoadModalOk}
                onCancel={handleLoadModalCancel}
                width={800}
            >
                <TextArea
                    rows={20}
                    value={yamlContent}
                    onChange={(e) => setYamlContent(e.target.value)}
                    placeholder="Paste YAML content here"
                />
            </Modal>
        </Space>
    )
}

export default PipelineEditor;