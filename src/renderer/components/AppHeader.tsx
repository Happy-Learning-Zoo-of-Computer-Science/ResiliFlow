import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const AppHeader: React.FC = () => {
  return (
    <>
      <div>
        <Link to="/">Home</Link>
      </div>
    </>
  )
}

export default AppHeader
