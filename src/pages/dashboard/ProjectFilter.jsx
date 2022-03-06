import { useState } from "react"

const  filterList = ['All', 'Mine', 'R&D', 'Design', 'Product', 'BizDev', 'Operations']

export default function ProjectFilter() {
    const [currFilter, setCurrFilter] = useState('All')

    const handleClick = (f) => {
        console.log(f)
        setCurrFilter(f)
    }

  return (
    <div className='project-filter'>
        <nav>
            <p>Filter by:</p>
            {filterList.map((f) => (
                <button key={f}
                    onClick={() => handleClick(f)}
                    className={currFilter == f ? 'active' : ''}
                >
                    {f}
                </button>
            ))}
        </nav>
    </div>
  )
}
