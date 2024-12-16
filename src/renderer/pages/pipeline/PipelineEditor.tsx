import React, {useState} from "react";
import {Button, message, Modal, Space} from "antd";
import {
    ReactFlow,
    type Node as RFNode,
    type Edge as RFEdge,
    MarkerType,
    Background,
    BackgroundVariant,
    OnNodesChange,
    OnEdgesChange,
    applyNodeChanges,
    applyEdgeChanges, Connection, OnConnect,
} from '@xyflow/react'

import "../../assets/css/pipeline/PipelineEditor.css"
import {NodeData} from "../../../data/pipeline/NodeData";
import {SetupPythonNodeData} from "../../../data/pipeline/nodes/SetupPythonNodeData";
import {InstallDependenciesNodeData} from "../../../data/pipeline/nodes/InstallDependenciesNodeData";
import {RunPyLintNodeData} from "../../../data/pipeline/nodes/RunPyLintNodeData";
import Serializer from "../../../util/Serializer";
import TextArea from "antd/es/input/TextArea";
import NodeProperty from "../../components/pipeline/NodeProperty";


const PipelineEditor: React.FC = () => {
    const x = [
        new SetupPythonNodeData(),
        new InstallDependenciesNodeData(),
        new RunPyLintNodeData(),
    ]
    x[0].outputPort = x[1].id;
    x[1].inputPort = x[0].id;
    x[1].outputPort = x[2].id;
    x[2].inputPort = x[1].id;
    x[0].position = {x: 100, y: 100};
    x[1].position = {x: 100, y: 200};
    x[2].position = {x: 100, y: 300};

    const [data, setData] = useState<NodeData<any>[]>(x);

    const initialNodes = nodeDataToReactFlowNodes(data);
    const initialEdges = createEdgesFromNodeData(data);

    const [nodes, setNodes] = useState<RFNode[]>(initialNodes);
    const [edges, setEdges] = useState<RFEdge[]>(initialEdges);

    const [selectedNode, setSelectedNode] = useState<NodeData<any>>();

    function onNodeSelect(event: React.MouseEvent, node: RFNode): void {
        console.log(node, data);
        const nodeInfo = data.find(
            (element) => element.id === node.id,
        )
        console.log("setSelectedNode", nodeInfo);
        setSelectedNode(nodeInfo);
    }

    const onConnect: OnConnect = (conn: Connection) => {
        const source = conn.source;
        const target = conn.target;

        data.forEach(d => {
            if (d.outputPort === target) d.outputPort = undefined;
            if (d.inputPort === source) d.inputPort = undefined;
            if (d.id === source) d.outputPort = target;
            if (d.id === target) d.inputPort = source;
        });

        setData(data);
        setEdges(createEdgesFromNodeData(data));
    }

    const handleNodesChange: OnNodesChange = (changes) => {
        setNodes((currentNodes) => {
            const updatedNodes = applyNodeChanges(changes, currentNodes);
            // 将updatedNodes的位置等属性同步回data
            const updatedData = data.map(d => {
                const matchingNode = updatedNodes.find(n => n.id === d.id);
                if (matchingNode) {
                    d.position = matchingNode.position;
                }
                return d;
            });
            setData(updatedData);
            return updatedNodes;
        });
    };

    const handleEdgesChange: OnEdgesChange = (changes) => {
        setEdges((currentEdges) => {
            const updatedEdges = applyEdgeChanges(changes, currentEdges);

            // 根据updatedEdges重建data中的连接关系
            // 假设：edges的source节点的outputPort = targetNode的id
            //       edges的target节点的inputPort = sourceNode的id
            const updatedData = data.map(d => {
                // 清空旧的input/outputPort
                d.inputPort = undefined;
                d.outputPort = undefined;
                return d;
            });

            updatedEdges.forEach(e => {
                const sourceNode = updatedData.find(d => d.id === e.source);
                const targetNode = updatedData.find(d => d.id === e.target);
                if (sourceNode && targetNode) {
                    sourceNode.outputPort = targetNode.id;
                    targetNode.inputPort = sourceNode.id;
                }
            });

            setData(updatedData);
            return updatedEdges;
        });
    };

    const [isSaveModalVisible, setIsSaveModalVisible] = useState(false);
    const [isLoadModalVisible, setIsLoadModalVisible] = useState(false);
    const [yamlContent, setYamlContent] = useState('');
    const [filePath, setFilePath] = useState<string>('');

    const handleSave = () => {
        const yamlString = Serializer.serialize(data);
        setYamlContent(yamlString);
        setIsSaveModalVisible(true);
        return yamlString;
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
            setData(deserializedData);
            setNodes(nodeDataToReactFlowNodes(deserializedData));
            setEdges(createEdgesFromNodeData(deserializedData));
            message.success('Load successfully');
            setIsLoadModalVisible(false);
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

    const handleLoadFromFile = async () => {
        try {
            const options = {
                properties: ["openFile"],
                filters: [
                    {name: 'Pipeline Files', extensions: ['pipeline']},
                    {name: 'All Files', extensions: ['*']}
                ]
            }
            const content = await window.electronAPI.readTextFile(options);
            setYamlContent(content);
            message.success("Loaded file content to text area. Click Load to load this pipeline.");
        } catch (error) {
            console.error("Failed to load file:", error);
            message.error("Failed to load file");
        }
    };

    const handleSaveToFile = async () => {
        let yamlString = yamlContent;
        if (!isSaveModalVisible) {
            yamlString = handleSave();
        }
        try {
            const options = {
                title: "Save Pipeline",
                defaultPath: "untitled.pipeline",
                filters: [
                    {name: 'Pipeline Files', extensions: ['pipeline']},
                    {name: 'All Files', extensions: ['*']}
                ]
            }
            const result = await window.electronAPI.saveTextFile(yamlString, options);
            if (result === null) {
                message.warning("Save pipeline cancelled");
            }
            message.success("File saved successfully");
            setFilePath(result);
            return result;
        } catch (error) {
            console.error("Failed to save file:", error);
            message.error("Failed to save file");
        }
        return ""
    };

    const handleCompile = async () => {
        var path = filePath;
        if (path === "") {
            path = await handleSaveToFile();
            if (path === "") {
                return;
            }
        }

        const options = {
            title: "Save GitHub Actions Workflow",
            defaultPath: "untitled.yaml",
            filters: [
                {name: 'GitHub Actions Workflow', extensions: ['yaml']},
                {name: 'All Files', extensions: ['*']}
            ]
        }

        const output = await window.electronAPI.selectSavePath(options);

        const result = await fetch(`http://127.0.0.1:5000/api/pipeline/compile?input=${encodeURI(path)}&output=${encodeURI(output)}`);

        if (result) {
            message.success(`Workflow saved to: ${output}, result: ${result.statusText}`);
        } else {
            message.error("Failed to save pipeline");
        }
    }

    return (
        <div style={{width: "100%", height: "100%", display: "flex", flexDirection: "column", overflow: "hidden"}}>
            <Space direction="horizontal" style={{marginBottom: 16}}>
                <Button type="primary" onClick={handleSaveToFile}>Save</Button>
                <Button onClick={handleLoad}>Load</Button>
                <Button onClick={handleCompile}>Compile</Button>
            </Space>
            <div style={{flex: 1, display: 'flex', flexDirection: 'row'}}>
                <div style={{flex: 1}}>

                    <ReactFlow
                        nodes={nodes}
                        onNodesChange={handleNodesChange}
                        edges={edges}
                        onEdgesChange={handleEdgesChange}
                        onConnect={onConnect}
                        onNodeClick={onNodeSelect}
                    >
                        <Background
                            gap={16}
                            size={0.5}
                            variant={BackgroundVariant.Dots}
                        />
                    </ReactFlow>
                </div>
                <div style={{width: "300px", height: "100%"}}>
                    {selectedNode !== undefined ? <NodeProperty data={selectedNode}/> : <></>}
                </div>
            </div>
            <Modal
                title="Save YAML"
                open={isSaveModalVisible}
                onOk={handleSaveModalOk}
                onCancel={handleSaveModalCancel}
                footer={[
                    <Button key="copy" onClick={() => {
                        navigator.clipboard.writeText(yamlContent);
                        message.success('Copied to Clipboard');
                    }}>
                        Copy to Clipboard
                    </Button>,
                    <Button key="saveToFile" onClick={handleSaveToFile}>
                        Save
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
                footer={[
                    <Button key="loadFromFile" onClick={handleLoadFromFile}>
                        Load From File
                    </Button>,
                    <Button key="load" onClick={handleLoadModalOk}>
                        Load
                    </Button>,
                    <Button key="close" onClick={handleLoadModalCancel}>
                        Close
                    </Button>,
                ]}
            >
                <TextArea
                    rows={20}
                    value={yamlContent}
                    onChange={(e) => setYamlContent(e.target.value)}
                    placeholder="Paste YAML content here"
                />
            </Modal>
        </div>
    )
}

function nodeDataToReactFlowNodes(data: NodeData<any> []): RFNode[] {
    return data.map((nd, index) => {
        return {
            id: nd.id,
            position: nd.position,
            data: {
                nodeData: nd,
                label: nd.getLabel(),
            },
            style: {
                backgroundColor: '#5cdbd3',
                border: '1px solid #08979c',
                borderRadius: '5px',
                padding: '10px',
            },
        }
    });
}

function createEdgesFromNodeData(data: NodeData<any> []): RFEdge[] {
    const edges: RFEdge[] = [];
    console.log(data);
    data.forEach((sourceNodeData) => {
        const sourceId = sourceNodeData.id;
        const {outputPort} = sourceNodeData;
        if (!outputPort) return;

        data.forEach((targetNodeData) => {
            const targetId = targetNodeData.id;
            const {inputPort} = targetNodeData;
            if (inputPort && inputPort === sourceId && outputPort === targetId) {
                edges.push({
                    id: `${sourceId}-${targetId}`,
                    source: sourceId,
                    target: targetId,
                    markerEnd: {
                        type: MarkerType.ArrowClosed,
                        width: 20,
                        height: 20,
                        color: '#FF0072',
                    },
                });
            }
        });
    });
    return edges;
}

export default PipelineEditor;