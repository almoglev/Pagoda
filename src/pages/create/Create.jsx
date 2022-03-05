import { useState } from 'react'
import Select from 'react-select'

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
  // form field values
  const [name, setName] = useState('')
  const [details, setDetails] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [category, setCategory] = useState('')
  const [assignedUsers, setAssignedUsers] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(name, details, dueDate, category.value)
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
          {/* Assignee select here */}
        </label>

        <button className='btn'>Add Project</button>
      </form>
    </div>
  )
}
