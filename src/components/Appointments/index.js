// Write your code here
import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import './index.css'

import AppointmentItem from '../AppointmentItem/index'

class Appointments extends Component {
  state = {date: '', title: '', appointmentsList: [], isStarredActive: false}

  getDate = event => {
    this.setState({date: event.target.value})
  }

  getTitle = event => {
    this.setState({title: event.target.value})
  }

  onSubmitFn = event => {
    event.preventDefault()

    const {date, title, appointmentsList} = this.state
    const appointment = {
      id: uuidv4(),
      date,
      title,
      isStarred: false,
    }
    const updateList = [...appointmentsList, appointment]
    this.setState({appointmentsList: updateList, date: '', title: ''})
  }

  starredItem = id => {
    const {appointmentsList} = this.state

    const updatedList = appointmentsList.map(eachItem => {
      if (eachItem.id === id) {
        if (eachItem.isStarred) {
          return {...eachItem, isStarred: false}
        }
        return {...eachItem, isStarred: true}
      }
      return eachItem
    })
    this.setState({appointmentsList: updatedList})
  }

  starredStateFn = appointmentsList => {
    const {isStarredActive} = this.state

    if (isStarredActive) {
      return appointmentsList.filter(eachItem => eachItem.isStarred === true)
    }
    return appointmentsList
  }

  starredButtonClicked = () => {
    const {isStarredActive} = this.state
    if (isStarredActive) {
      this.setState({isStarredActive: false})
    } else {
      this.setState({isStarredActive: true})
    }
  }

  render() {
    const {title, date, appointmentsList} = this.state

    const filteredList = this.starredStateFn(appointmentsList)

    return (
      <div className="container">
        <div className="card-container">
          <div className="in-card-container">
            <form onSubmit={this.onSubmitFn}>
              <h1 className="heading">Add Appointment</h1>
              <label>
                TITLE
                <input type="text" onChange={this.getTitle} value={title} />
              </label>
              <label>
                DATE
                <input type="date" onChange={this.getDate} value={date} />
              </label>
              <button type="submit">Add</button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png "
              alt="appointments"
              className="image"
            />
          </div>
          <hr />
          <div className="heading-container">
            <h1 className="heading">Appointments</h1>
            <button
              type="button"
              className="btn"
              onClick={this.starredButtonClicked}
            >
              Starred
            </button>
          </div>
          <ul>
            {filteredList.map(eachItem => (
              <AppointmentItem
                eachItem={eachItem}
                key={eachItem.id}
                starredItem={this.starredItem}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
