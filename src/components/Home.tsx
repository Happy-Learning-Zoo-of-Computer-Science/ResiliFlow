import { Link } from 'react-router-dom'

const Home: React.FC = () => {
  return (
    <>
      <div>
        <Link to="/create-project">Create a project</Link>
        <div></div>
        <Link to="/choose-project">Choose a project</Link>
        <div></div>
        <Link to="/inspection">Inspection</Link>
        <div></div>
        <Link to="/report">Report</Link>
      </div>
    </>
  )
}

export default Home
