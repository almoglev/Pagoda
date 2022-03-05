import { useState, useEffect } from 'react'
import Select from 'react-select'
import { useCollection } from '../../hooks/useCollection'
import { timestamp } from '../../firebase/config'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useFirestore } from '../../hooks/useFirestore'
import { useHistory } from 'react-router-dom'

// styles
import './Create.css'

const categories = [
  {value: 'rnd', label: "R&D"},
  {value: 'design', label: "Design"},
  {value: 'product', label: "Product"},
  {value: 'bizdev', label: "BizDev"},
  {value: 'operations', label: "Operations"},
]

export default function Create() {
  const { documents } = useCollection('users')
  const [allUsers, setAllUsers] = useState([])
  const { user } = useAuthContext()
  const { addDocument, response } = useFirestore('projects')
  const history = useHistory()

  // form field values
  const [name, setName] = useState('')
  const [details, setDetails] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [category, setCategory] = useState('')
  const [assignedUsers, setAssignedUsers] = useState([])

  const [formError, setFormError] = useState(null)

  useEffect(() => {
    if (documents) {
      const options = documents.map(user => (
        { value: user, label: user.displayName}
      ))

        setAllUsers(options)
    }
  }, [documents])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError(null)

    if (!category) {
      setFormError("Please select a project category")
      return
    }

    if (assignedUsers.length < 1) {
      setFormError("Please assign the project to at least 1 user")
      return
    }

    const createdBy = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      id: user.uid
    }

    const assignedUsersList = assignedUsers.map((u) => (
      {
        displayName: u.value.displayName,
        photoURL: u.value.photoURL,
        id: u.value.id
      }
    ))

    const newProject = {
      name,
      details,
      category: category.value,
      dueDate: timestamp.fromDate(new Date(dueDate)),
      comments: [],
      createdBy,
      assignedUsersList
    }

    await addDocument(newProject)
    if (!response.error) {
      history.push('/')
    }
  }

  return (
    <div className='create-form'>
      <h2 className='page-title'>Create a New Project</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Name</span>
          <input
            required
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>

        <label>
          <span>Details</span>
          <textarea
            required
            type="text"
            onChange={(e) => setDetails(e.target.value)}
            value={details}
          ></textarea>
        </label>

        <label>
          <span>Due Date</span>
          <input
            required
            type="date"
            onChange={(e) => setDueDate(e.target.value)}
            value={dueDate}
          />
        </label>
        
        <label>
          <span>Category</span>
          <Select
            options={categories}
            onChange={(option) => setCategory(option)}
          />
        </label>

        <label>
          <span>Assign To</span>
          <Select
          options={allUsers}
          onChange={(option) => setAssignedUsers(option)}
          isMulti
          />
        </label>

        <button className='btn'>Add Project</button>

        {formError && <p className='error'>{formError}</p>}
      </form>
    </div>
  )
}
