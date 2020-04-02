import React from 'react'
import Popup from 'reactjs-popup'
import { link } from 'react-router-dom'

import { connect } from 'react-redux'

import SignUp from './SignUp'
import Login from './Login'
import TabsAll from './TabsAll'

import './LoginAndSignUpPopup.css'


class LoginAndSignUpPopup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      activeTabIndex: 0
    }
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.handleClickTab = this.handleClickTab.bind(this)
  }
  openModal() {
    this.setState({ open: true })
  }
  closeModal() {
    this.setState({ open: false })
  }

  // 最上層 view 的 click 控制事件
  handleClickTab(tabIndex) {
    this.setState({
      activeTabIndex: tabIndex
    })
  }

  render() {
    const { activeTabIndex } = this.state;
    return (
      <div className="topBNContainer">
        <div className="joinRightNow" onClick={this.openModal}>
          <p>Joi<span className="break_point">n</span> No<span className="break_point">w ></span></p>
        </div>
        <Popup
          open={this.state.open}
          closeOnDocumentClick
          onClose={this.closeModal}

        >
          <div className="login_and_signup_wrap_popup">
            <TabsAll handleClickTab={this.handleClickTab} activeTabIndex={activeTabIndex} />
            {activeTabIndex==0 ? (
               <Login />
            ) : (
              <SignUp />
              )}
          </div>
        </Popup>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {}
}


// 這個是 redux 的 connect
export default connect(mapStateToProps)(LoginAndSignUpPopup);