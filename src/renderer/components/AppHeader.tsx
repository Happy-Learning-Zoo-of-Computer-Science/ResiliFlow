import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const AppHeader: React.FC = () => {
  const [data, setData] = useState(null)

  useEffect(() => {
    fetch('http://127.0.0.1:5174/data')
      .then((res) => res.json())
      .then((data) => setData(data.message))
  }, [])

  return (
    <>
      <div>
        <h1>{data}</h1>
        <Link to="/">Home</Link>
      </div>
    </>
  )
}

export default AppHeader
