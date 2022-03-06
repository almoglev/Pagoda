
// Styles
import './Avatar.css'

export default function Avatar({ src, name}) {
  return (
    <div className='avatar'>
        <img src={src} alt="user avatar" title={name}/>
    </div>
  )
}
