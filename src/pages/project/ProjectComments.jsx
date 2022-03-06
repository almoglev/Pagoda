import { useState } from "react"
import { timestamp } from "../../firebase/config"
import { useAuthContext } from "../../hooks/useAuthContext"
import { useFirestore } from "../../hooks/useFirestore"

export default function ProjectComments({ project }) {
    const [newComment, setNewComment] = useState('')
    const { user } = useAuthContext()
    const { updateDocument, response } = useFirestore('projects')

    const handleSubmit = async (e) => {
        e.preventDefault()
        const commentToAdd = {
            displayName: user.displayName,
            photoURL: user.photoURL,
            content: newComment,
            createdAt: timestamp.fromDate(new Date()),
            id: Math.random()
        }
        
        const comments = {
            comments: [...project.comments, commentToAdd]
        }

        await updateDocument(project.id, comments)

        if (!response.error) {
            setNewComment('')
        }
    }

  return (
    <div className="project-comments">
        <h4>Project Comments</h4>
        <form className="add-comment" onSubmit={handleSubmit}>
            <label>
                <span>Add new comment</span>
                <textarea
                  required
                  onChange={(e) => setNewComment(e.target.value)}
                  value={newComment}
                />
                <button className="btn">Add Comment</button>
            </label>
        </form>
    </div>
  )
}
