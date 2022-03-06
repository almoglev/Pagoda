import Avatar from "../../components/Avatar"
import { useFirestore } from "../../hooks/useFirestore"
import { useAuthContext } from "../../hooks/useAuthContext"
import { useHistory } from "react-router-dom"

export default function ProjectSummary({ project }) {
    const { deleteDocument } = useFirestore('projects')
    const { user } = useAuthContext()
    const history = useHistory()

    const handleDelete = (e) => {
        deleteDocument(project.id)
        history.push('/')
    }
  
  return (
<div>
      <div className="project-summary">
        <h2 className="page-title">{`${project.category} - ${project.name}`}</h2>
        <p className="due-date">
          Project due by {project.dueDate.toDate().toDateString()}
        </p>
        <p className="details">
          {project.details}
        </p>
        <h4>Project created by</h4>
        <div className="assigned-users">
              <Avatar src={project.createdBy.photoURL} name={project.createdBy.displayName} />
        </div>
        <h4>Project assigned to</h4>
        <div className="assigned-users">
          {project.assignedUsersList.map(user => (
            <div key={user.id}>
              <Avatar src={user.photoURL} name={user.displayName} />
            </div>
          ))}
        </div>   
      </div>
      {user.uid === project.createdBy.id && (
          <>
            <button className="btn" onClick={handleDelete}>Mark as Complete</button>
            <p className="complete-project">Notice: marking as complete will delete the project</p>
          </>
        )}
    </div>
  )
}
