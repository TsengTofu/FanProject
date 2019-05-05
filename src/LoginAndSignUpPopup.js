import React from 'react'
import Popup from 'reactjs-popup'
import { link } from 'react-router-dom'

import { connect } from 'react-redux'

import SignUp from './SignUp'
import Login from './Login'
import './LoginAndSignUpPopup.css'


class LoginAndSignUpPopup extends React.Component {
    constructor(props) {
      super(props)
      this.state = { open: false }
      this.openModal = this.openModal.bind(this)
      this.closeModal = this.closeModal.bind(this)
  
    }
    openModal (){
      this.setState({ open: true })
    }
    closeModal () {
      this.setState({ open: false })
    }
  
    render() {
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
            <div>
              <Login/>
              <SignUp/>
            </div>          
          </Popup>
        </div>
      )
    }
  }
  

const mapStateToProps = (state) =>{
  return{}
}


// 這個是 redux 的 connect
export default connect(mapStateToProps)(LoginAndSignUpPopup);