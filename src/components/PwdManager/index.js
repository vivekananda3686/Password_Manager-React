import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import PwdItem from '../PwdItem'
import './index.css'

class PwdManager extends Component {
  state = {
    pwdList: [],
    website: '',
    name: '',
    pwd: '',
    count: 0,
    show: true,
    searchPwd: '',
    leng: false,
  }

  onChangeWebsite = event => {
    this.setState({
      website: event.target.value,
    })
  }

  onChangeName = event => {
    this.setState({
      name: event.target.value,
    })
  }

  onChangePassword = event => {
    this.setState({
      pwd: event.target.value,
    })
  }

  addPassword = event => {
    event.preventDefault()
    const {name, website, pwd} = this.state
    const newPwd = {
      website,
      name,
      pwd,
      id: uuidv4(),
    }

    this.setState(prevState => ({
      pwdList: [...prevState.pwdList, newPwd],
      website: '',
      name: '',
      pwd: '',
      count: prevState.count + 1,
    }))
  }

  displayPassword = () => {
    this.setState(prevState => ({
      show: !prevState.show,
    }))
  }

  deletePwd = val => {
    const {pwdList} = this.state
    const results = pwdList.filter(each => each.id !== val)

    this.setState({
      pwdList: results,
    })

    this.setState(prevState => ({
      count: prevState.count - 1,
    }))
  }

  onChangeSearch = event => {
    this.setState({
      searchPwd: event.target.value,
    })
  }

  getResults = () => {
    const {pwdList, searchPwd} = this.state
    const finalresults = pwdList.filter(each =>
      each.website.toLowerCase().includes(searchPwd.toLowerCase()),
    )

    return finalresults
  }

  render() {
    const {website, name, pwd, count, show, searchPwd} = this.state
    const finalPwds = this.getResults()

    return (
      <div className="main-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="image-1"
        />
        <div className="first-card">
          <form className="input-card" onSubmit={this.addPassword}>
            <h1>Add New Password</h1>
            <div className="input-fields">
              <div>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                  className="image-3"
                />
              </div>
              <hr />
              <div>
                <input
                  type="text"
                  placeholder="Enter Website"
                  value={website}
                  onChange={this.onChangeWebsite}
                />
              </div>
            </div>
            <div className="input-fields">
              <div>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                  className="image-3"
                />
              </div>
              <hr />
              <div>
                <input
                  type="text"
                  placeholder="Enter Username"
                  value={name}
                  onChange={this.onChangeName}
                />
              </div>
            </div>
            <div className="input-fields">
              <div>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                  className="image-3"
                />
              </div>
              <hr />
              <div>
                <input
                  type="password"
                  placeholder="Enter Password"
                  value={pwd}
                  onChange={this.onChangePassword}
                />
              </div>
            </div>
            <button className="add-button">Add</button>
          </form>
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
              alt="password manager"
              className="image-2"
            />
          </div>
        </div>
        <div className="second-container">
          <div className="all-pwd-cont-1">
            <div className="pwd-count-cont">
              <div>
                <h1>Your Passwords</h1>
              </div>
              <div className="count-para">
                <p>{count}</p>
              </div>
            </div>
            <div className="input-fields">
              <div>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                  className="image-3"
                />
              </div>
              <hr />
              <div>
                <input
                  type="search"
                  placeholder="Search"
                  value={searchPwd}
                  onChange={this.onChangeSearch}
                />
              </div>
            </div>
          </div>
          <hr />
          <div className="show-password">
            <form>
              <input
                type="checkbox"
                id="display"
                onChange={this.displayPassword}
              />
              <label htmlFor="display">Show Passwords</label>
            </form>
          </div>
          <div>
            <ul className="password-list">
              {finalPwds.length === 0 ? (
                <div className="no-pwd">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                    alt="no passwords"
                  />
                  <p>No Passwords</p>
                </div>
              ) : (
                finalPwds.map(each => (
                  <PwdItem
                    details={each}
                    key={each.id}
                    show={show}
                    deletePwd={this.deletePwd}
                  />
                ))
              )}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default PwdManager
