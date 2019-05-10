import React from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { signUp } from './store/actions/authAction'
import email from './img/svg/email.svg'
import password from './img/svg/password.svg'
import phone from './img/svg/phone.svg'
import user from './img/svg/user.svg'

// 組件

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      user_name: '',
      phone_number: ''
    };
    this.handleSignUp = this.handleSignUp.bind(this);
  }

  handleSignUp(e) {
    e.preventDefault();
    console.log(this.state);
    this.props.signUp(this.state);
  }

  render() {
    const { auth, authError } = this.props;
    if (auth.id) return <Redirect to='/home' />
    return (
      <form className="signup_form" onSubmit={this.handleSignUp}>
        <div>
          <label htmlFor="user_name" className="user_title"><img src={user} alt="" />姓名</label>
          <input id="user_name" value={this.state.user_name} placeholder="Name" type="text" onChange={(e) => this.setState({ user_name: e.target.value })} />
        </div>
        <div>
          <label htmlFor="phone_number" className="phone_title"><img src={phone} alt="" />電話</label>
          <input id="phone_number" value={this.state.phone_number} placeholder="Phone Number" type="text" onChange={(e) => this.setState({ phone_number: e.target.value })} />
        </div>
        <div>
          <label htmlFor="email" className="email_title"><img src={email} alt="" />信箱</label>
          <input id="email" value={this.state.email} placeholder="E-mail" type="text" onChange={(e) => this.setState({ email: e.target.value })} />
        </div>
        <div>
          <label htmlFor="password" className="password_title"><img src={password} alt="" />密碼</label>
          <input id="password" value={this.state.password} placeholder="Password" type="password" onChange={(e) => this.setState({ password: e.target.value })} />
        </div>
        <button>註冊</button>
        <div>{authError ? <p className="errorMsg">{authError}</p> : null}</div>
      </form>
    );
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (newUser) => dispatch(signUp(newUser))
  }
}

const mapStateToProps = (state) => {
  console.log(state)
  // 這邊可以看到firebase的預設功能
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
