import React, { useCallback } from 'react'
import {
  addEdge,
  ReactFlow,
  useEdgesState,
  useNodesState,
  type Node,
  type Edge,
  MarkerType,
} from '@xyflow/react'

import '@xyflow/react/dist/style.css'
import { Button, Card, Dropdown, MenuProps, Space } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import '../assets/css/VisualizePanel/VisualizePanel.css'
interface NodeInfo {
  title: string
  content: string
}
export const VisualizePanel: React.FC = () => {
  const [selectedNodeInfo, setSelectedNodeInfo] =
    React.useState<NodeInfo | null>(null)
  const nodeInfoMap = [
    ['Install', 'pip install -r requirements.txt'],
    ['Test', 'pytest'],
    ['Lint', "pylint $(git ls-files '*.py')"],
  ]
  const initialNodes: Node[] = [
    {
      id: '1',
      position: { x: 300, y: 100 },
      data: { label: 'Install' },
      style: {
        //Cyan
        backgroundColor: '#5cdbd3',
        border: '1px solid #08979c',
        borderRadius: '5px',
        padding: '10px',
      },
    },
    {
      id: '2',
      position: { x: 300, y: 200 },
      data: { label: 'Test' },
      style: {
        //Daybreak Blue
        backgroundColor: '#69b1ff',
        border: '1px solid #0958d9',
        borderRadius: '5px',
        padding: '10px',
      },
    },
  ]
  const initialEdges: Edge[] = [
    {
      id: 'e1-2',
      source: '1',
      target: '2',
      // animated: true,
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: 20,
        height: 20,
        color: '#FF0072',
      },
    },
  ]
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  const onConnect = useCallback(
    (params: any) =>
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            // animated: true,
            markerEnd: {
              type: MarkerType.ArrowClosed,
              width: 20,
              height: 20,
              color: '#FF0072',
            },
          },
          eds,
        ),
      ),
    [setEdges],
  )

  const AddNode: MenuProps['onClick'] = (e) => {
    const label = e.key
    setNodes((nds) => [
      ...nds,
      {
        id: (nds.length + 1).toString(),
        position: {
          x: nds[nds.length - 1].position.x + 50,
          y: nds[nds.length - 1].position.y + 50,
        },
        data: { label },
        style:
          label === 'Install'
            ? {
                backgroundColor: '#5cdbd3',
                border: '1px solid #08979c',
                borderRadius: '5px',
                padding: '10px',
              }
            : label === 'Test'
            ? {
                backgroundColor: '#69b1ff',
                border: '1px solid #0958d9',
                borderRadius: '5px',
                padding: '10px',
              }
            : {
                backgroundColor: '#95de64',
                border: '1px solid #389e0d',
                borderRadius: '5px',
                padding: '10px',
              },
      },
    ])
  }

  const items: MenuProps['items'] = [
    {
      key: 'Install',
      label: 'Install',
    },
    {
      key: 'Test',
      label: 'Test',
    },
    {
      key: 'Lint',
      label: 'Lint',
    },
  ]
  const menuProps = {
    items,
    onClick: AddNode,
  }
  const validNodes = () => {
    console.log(nodes)
  }
  function showNodeInfo(event: React.MouseEvent, node: Node): void {
    console.log(node)
    const nodeInfo = nodeInfoMap.find(
      (element) => element[0] === node.data.label,
    )
    if (nodeInfo) {
      setSelectedNodeInfo({ title: nodeInfo[0], content: nodeInfo[1] })
    }
  }

  return (
    <div className="mainFrame">
      <Dropdown menu={menuProps}>
        <Button>
          <Space>
            Add Nodes
            <DownOutlined />
          </Space>
        </Button>
      </Dropdown>
      <Button type="primary" onClick={() => validNodes}>
        Save
      </Button>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={showNodeInfo}
      />
      {selectedNodeInfo && (
        <Card title={selectedNodeInfo.title} style={{ width: 300 }}>
          <p>{selectedNodeInfo.content}</p>
        </Card>
      )}
    </div>
  )
}
