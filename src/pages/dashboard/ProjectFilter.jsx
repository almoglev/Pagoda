const  filterList = ['All', 'Mine', 'R&D', 'Design', 'Product', 'BizDev', 'Operations']

export default function ProjectFilter({ currFilter, changeFilter }) {

    const handleClick = (f) => {
        changeFilter(f)
    }

  return (
    <div className='project-filter'>
        <nav>
            <p>Filter by:</p>
            {filterList.map((f) => (
                <button key={f}
                    onClick={() => handleClick(f)}
                    className={currFilter === f ? 'active' : ''}
                >
                    {f}
                </button>
            ))}
        </nav>
    </div>
  )
}
