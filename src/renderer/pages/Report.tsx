import { Badge, Table } from 'antd'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
interface ReportData {
  id: string
  path: string
  line: number
  messageId: string
  symbol: string
  severity: Severity
  message: string
  category: Severity
}

type Severity = 'convention' | 'refactor' | 'warning' | 'error' | 'fatal'
//todo fetch report data from report serialize module
function fetchReportData(pipelineId: string): ReportData[] {
  return [
    {
      id: '1',
      path: 'my_script.py',
      line: 12,
      messageId: 'C0103',
      symbol: 'invalid-name',
      severity: 'convention',
      message: 'Variable name is too short',
      category: 'convention',
    },
    {
      id: '2',
      path: 'example_module.py',
      line: 34,
      messageId: 'R0914',
      symbol: 'too-many-locals',
      severity: 'refactor',
      message: 'Too many local variables',
      category: 'refactor',
    },
    {
      id: '3',
      path: 'test_file.py',
      line: 50,
      messageId: 'W0612',
      symbol: 'unused-variable',
      severity: 'warning',
      message: "Unused variable 'temp_var'",
      category: 'warning',
    },
  ]
}
const colorSeverityMap: Record<Severity, string> = {
  convention: 'blue',
  refactor: 'cyan',
  warning: 'orange',
  error: 'red',
  fatal: 'magenta',
}
const Report: React.FC = () => {
  const { pipelineId } = useParams()

  const [reportData, setReportData] = useState<ReportData[]>([])

  useEffect(() => {
    const report = fetchReportData(pipelineId!)
    console.log(report)
    setReportData(report)
  }, [])

  return (
    <>
      <Table<ReportData>
        dataSource={reportData}
        rowKey="id"
        bordered
        title={() => 'Report'}
      >
        <Table.Column<ReportData>
          key="id"
          title="Id"
          dataIndex="id"
          align="center"
        />
        <Table.Column<ReportData>
          key="path"
          title="Path"
          dataIndex="path"
          align="center"
        />
        <Table.Column<ReportData>
          key="line"
          title="Line"
          dataIndex="line"
          align="center"
        />
        <Table.Column<ReportData>
          key="messageId"
          title="MessageId"
          dataIndex="messageId"
          align="center"
        />
        <Table.Column<ReportData>
          key="symbol"
          title="Symbol"
          dataIndex="symbol"
          align="center"
        />
        <Table.Column<ReportData>
          key="severity"
          title="Severity"
          dataIndex="severity"
          align="center"
          render={(severity: Severity) => {
            return (
              <Badge
                key={severity}
                color={colorSeverityMap[severity]}
                text={severity}
              />
            )
          }}
        />
        <Table.Column<ReportData>
          key="message"
          title="Message"
          dataIndex="message"
          align="center"
        />
        <Table.Column<ReportData>
          key="category"
          title="Category"
          dataIndex="category"
          align="center"
          render={(severity: Severity) => {
            return (
              <Badge
                key={severity}
                color={colorSeverityMap[severity]}
                text={severity}
              />
            )
          }}
        />
      </Table>
    </>
  )
}

export default Report
