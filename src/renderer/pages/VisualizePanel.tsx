import React, { useCallback } from 'react'
import {
  addEdge,
  ReactFlow,
  useEdgesState,
  useNodesState,
  type Node,
  type Edge,
} from '@xyflow/react'

import '@xyflow/react/dist/style.css'
import { Button, Dropdown, MenuProps, Space } from 'antd'
import { DownOutlined } from '@ant-design/icons'

export const VisualizePanel: React.FC = () => {
  const initialNodes: Node[] = [
    { id: '1', position: { x: 300, y: 100 }, data: { label: 'Build' } },
    { id: '2', position: { x: 300, y: 200 }, data: { label: 'Test' } },
  ]
  const initialEdges: Edge[] = [{ id: 'e1-2', source: '1', target: '2' }]
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
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
      },
    ])
  }

  const items: MenuProps['items'] = [
    {
      key: 'Build',
      label: 'Build',
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
  return (
    <div>
      <Dropdown menu={menuProps}>
        <Button>
          <Space>
            Add Nodes
            <DownOutlined />
          </Space>
        </Button>
      </Dropdown>
      <Button color="primary" onClick={() => validNodes}>
        Save
      </Button>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      />
    </div>
  )
}
