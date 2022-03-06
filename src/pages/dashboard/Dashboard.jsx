import ProjectList from '../../components/ProjectList'
import ProjectFilter from './ProjectFilter'
import { useCollection } from '../../hooks/useCollection'
import { useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'

// styles
import './Dashboard.css'

export default function Dashboard() {
  const { documents, error } = useCollection('projects')
  const [currFilter, setCurrFilter] = useState('All')
  const { user } = useAuthContext()

  const changeFilter = (f) => {
    setCurrFilter(f)
  }

  const filteredProjects = documents ? documents.filter((doc) => {
    switch (currFilter) {
      case 'All':
        return true
      case 'Mine':
        let isAssignedToMe = false
        doc.assignedUsersList.forEach((u) => {
          if (u.id === user.uid) {
            console.log(u.id === user.uid)
            isAssignedToMe =  true
          }
        })
        return isAssignedToMe
      case 'R&D':
      case 'Design':
      case 'Product':
      case 'BizDev': 
      case 'Operations':
        return doc.category === currFilter
      default:
        return true
    }
  }) : null

  return (
    <div>
      <h2 className='page-title'>Dashboard</h2>
      {error && <p className='error'>{error}</p>}
      {documents && (
        <ProjectFilter currFilter={currFilter} changeFilter={changeFilter}/>
      )}
      {filteredProjects && <ProjectList projects={filteredProjects} />}
    </div>
  )
}
