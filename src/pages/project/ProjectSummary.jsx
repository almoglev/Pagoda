import Avatar from "../../components/Avatar"

export default function ProjectSummary({ project }) {
  return (
<div>
      <div className="project-summary">
        <h2 className="page-title">{project.name}</h2>
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
    </div>
  )
}
