import { useLocation, useParams } from 'react-router-dom'

const Report: React.FC = () => {
  const { pipelineId } = useParams()
  return (
    <>
      <h1>Report</h1>
      <div>pipeline Id : {pipelineId ?? 'No pipeline ID provided'}</div>
    </>
  )
}

export default Report
