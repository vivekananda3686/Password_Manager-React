import {Component} from 'react'
import './index.css'

const PwdItem = props => {
  const {details, key, show, deletePwd} = props
  const {name, website, id, pwd} = details
  const firstChar = name[0]

  const displayPwd = () => {
    if (show) {
      return (
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
          alt="stars"
          className="stars-image"
        />
      )
    } else {
      return <p>{pwd}</p>
    }
  }

  const deleteItem = () => {
    deletePwd(id)
  }

  return (
    <li className="list-item">
      <div className="comment-item">
        <div className="pwd-padd">
          <p className="first-char">{firstChar}</p>
        </div>
        <div className="pwd-details-list pwd-padd">
          <p>{name}</p>
          <p>{website}</p>
          {displayPwd()}
        </div>
        <div className="pwd-padd">
          <button
            className="delete-button"
            onClick={deleteItem}
            data-testid="delete"
          >
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
              alt="delete"
            />
          </button>
        </div>
      </div>
    </li>
  )
}

export default PwdItem
