import {
  CheckCircleFilled,
  CloseCircleFilled,
  PauseCircleFilled,
} from '@ant-design/icons'
import { Button, Dropdown, MenuProps, Space, Table } from 'antd'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../../assets/css/Inspection/Inspection.css'
interface PipelineData {
  pipelineId: string
  pipelineName: string
  testCoverage: number
  pipelineMessage: string
  status: 'success' | 'failed' | 'pending'
}

const dropdownActionItems: MenuProps['items'] = [
  {
    label: 'Run Pipeline',
    key: 'run',
  },
  {
    label: 'Edit Pipeline',
    key: 'edit',
  },
  {
    label: 'View Report',
    key: 'view',
  },
]
const handleMenuClick = (
  e: any,
  pipelineId: string,
  navigate: ReturnType<typeof useNavigate>,
) => {
  switch (e.key) {
    case 'run':
      //todo run pipeline
      console.log('run')
      break
    case 'edit':
      //todo redirect to edit pipeline
      console.log('edit')
      break
    case 'view':
      navigate('/report/' + pipelineId)
      break
    default:
      console.log('default')
  }
}
const menuProps = {
  items: dropdownActionItems,
  onClick: handleMenuClick,
}

const Inspection: React.FC = () => {
  const navigate = useNavigate()

  const [pipelineData, setPipelineData] = useState<PipelineData[]>([])

  function fetchPipelineData() {
    //todo fetch pipeline data from report serialize module
    const data: PipelineData[] = [
      {
        pipelineId: '1',
        pipelineName: 'Pipeline 1',
        testCoverage: 95,
        pipelineMessage: 'some message',
        status: 'success',
      },
      {
        pipelineId: '2',
        pipelineName: 'Pipeline 2',
        testCoverage: 72,
        pipelineMessage: 'some message',
        status: 'success',
      },
      {
        pipelineId: '3',
        pipelineName: 'Pipeline 3',
        testCoverage: 40,
        pipelineMessage: 'some message',
        status: 'success',
      },
      {
        pipelineId: '4',
        pipelineName: 'Pipeline 4',
        testCoverage: 92,
        pipelineMessage: 'some message',
        status: 'success',
      },
      {
        pipelineId: '5',
        pipelineName: 'Pipeline 5',
        testCoverage: 60,
        pipelineMessage: 'some message',
        status: 'success',
      },
      {
        pipelineId: '6',
        pipelineName: 'Pipeline 6',
        testCoverage: 58,
        pipelineMessage: 'some message',
        status: 'success',
      },
      {
        pipelineId: '7',
        pipelineName: 'Pipeline 7',
        testCoverage: 0,
        pipelineMessage: 'some message',
        status: 'pending',
      },
      {
        pipelineId: '8',
        pipelineName: 'Pipeline 8',
        testCoverage: 15,
        pipelineMessage: 'some message',
        status: 'failed',
      },
    ]
    return setPipelineData(data)
  }
  return (
    <>
      <Table<PipelineData>
        dataSource={pipelineData}
        rowKey="pipelineId"
        bordered
        title={() => 'Inspection'}
        expandable={{
          expandedRowRender: (record) => <div>{record.pipelineMessage}</div>,
          rowExpandable: (record) => record.testCoverage != 0,
        }}
      >
        <Table.Column<PipelineData>
          key=""
          title="ID"
          dataIndex=""
          align="center"
          render={(_, __, index) => index + 1}
        />
        <Table.Column<PipelineData>
          key="pipelineId"
          title="Pipeline ID"
          dataIndex="pipelineId"
          align="center"
        />
        <Table.Column<PipelineData>
          key="name"
          title="Name"
          dataIndex="pipelineName"
          align="center"
        />
        <Table.Column<PipelineData>
          key="testCoverage"
          title="Test Coverage"
          dataIndex="testCoverage"
          align="center"
          render={(coverage) => (
            <Button
              className={
                coverage >= 75
                  ? 'high-coverage-button'
                  : coverage >= 50 && coverage < 75
                  ? 'medium-coverage-button'
                  : 'low-coverage-button'
              }
              shape="round"
            >
              {coverage}%
            </Button>
          )}
        />
        <Table.Column<PipelineData>
          key="status"
          title="Status"
          dataIndex="status"
          align="center"
          render={(status) => {
            switch (status) {
              case 'success':
                return (
                  <CheckCircleFilled style={{ color: 'green', fontSize: 16 }} />
                )
              case 'failed':
                return (
                  <CloseCircleFilled style={{ color: 'red', fontSize: 16 }} />
                )
              case 'pending':
                return (
                  <PauseCircleFilled
                    style={{ color: 'orange', fontSize: 16 }}
                  />
                )
            }
          }}
        />
        <Table.Column<PipelineData>
          key="action"
          title="Action"
          align="center"
          render={(_, record) => (
            <Dropdown
              menu={{
                ...menuProps,
                onClick: (e) => handleMenuClick(e, record.pipelineId, navigate),
              }}
            >
              <Button>
                <Space>Actions</Space>
              </Button>
            </Dropdown>
          )}
        />
      </Table>
    </>
  )
}

export default Inspection
