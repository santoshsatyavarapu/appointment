// Write your code here

import {format} from 'date-fns'

import './index.css'

const AppointmentItem = props => {
  const {eachItem, starredItem} = props

  const {id, date, title, isStarred} = eachItem

  const imageUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const formatDate = format(new Date(date), 'dd MMMM yyyy, EEEE')

  const favouriteButton = () => {
    starredItem(id)
  }

  return (
    <li>
      <div className="appointment-card">
        <p className="title-heading">{title}</p>
        <button
          type="button"
          className="starred-button"
          onClick={favouriteButton}
          data-testid="star"
        >
          <img src={imageUrl} alt="star" className="image-star" />
        </button>
      </div>
      <p className="date-para">Date: {formatDate}</p>
    </li>
  )
}

export default AppointmentItem
