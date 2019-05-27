import React from 'react';
import * as firebase from 'firebase/app';
import { Link } from 'react-router-dom'
// 組件

import { connect } from 'react-redux'
// 影片做的
import { Redirect } from 'react-router-dom'

// actions
import { signIn } from '../../store/actions/authAction'

import email from './img/svg/email.svg'
import password from './img/svg/password.svg'


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: ''};
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(e) {
    e.preventDefault();
    console.log(this.state);
    this.props.signIn(this.state);
    // action 才抓到資料
  }


  render() {
    const { authError, auth } = this.props;
    if (auth.id) return <Redirect to='/home' />
    return (
      <form className="login_form"
      // onSubmit={this.handleLogin} 這邊是原本的寫法
      >
        <div>
          <label htmlFor="email" className="email_title"><img src={email} alt="" />信箱</label>
          <input id="email_login" value={this.state.email} placeholder="E-mail" type="text" onChange={(e) => this.setState({ email: e.target.value })} />
          <span className="input-border"></span>
        </div>
        <div>
          <label htmlFor="password" className="password_title"><img src={password} alt="" />密碼</label>
          <input id="password_login" value={this.state.password} placeholder="Password" type="password" onChange={(e) => this.setState({ password: e.target.value })} />
        </div>
        <button onClick={this.handleLogin}>登入</button>
        <button
          onClick={() => {
            firebase.auth().signInAnonymously();
          }}
        >
          匿名登入
        </button>
        <div className="some_reminder">
          {authError ? <p className="errorMsg">{authError}</p> : null}
          <p className="ps_txt">Don't have an account? <Link to="">Sign up here.</Link></p>
        </div>
      </form>

    );
  }
};

// mapDispatchToProps 是一個函數
// 它可以傳入 dispatch, ownProps
// 定義 UI 組件如何發出 action
// 實際上就是要調用 dispatch 這個方法
const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (creds) => dispatch(signIn(creds))
  }
}

const mapStateToProps = (state) => {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Login)
// export default withRouter(Login);
// 這個是原本的