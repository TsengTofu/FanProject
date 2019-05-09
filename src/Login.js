import React from 'react';
import { withRouter } from "react-router";
import * as firebase from 'firebase/app';
// 組件

import { connect } from 'react-redux'
// 影片做的
import { Redirect } from 'react-router-dom'

// actions
import { signIn } from './store/actions/authAction'

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '' };
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(e){
    e.preventDefault();
    console.log(this.state);
    this.props.signIn(this.state);
    // action 才抓到資料
  }

  render() {
    const { authError, auth } = this.props;
    if(auth.id)return <Redirect to='/home'/>
    return (
        <form className="login_form" onSubmit={this.handleLogin}>
          <p>登入 Sign In</p>
          <div>
            <label htmlFor="email">信箱</label>
            <input id="email_login" value={this.state.email} type="text" onChange={ (e) => this.setState({ email: e.target.value }) } />
          </div>
          <div>
            <label htmlFor="password">密碼</label>
            <input id="password_login" value={this.state.password} type="password" onChange={ (e) => this.setState({ password: e.target.value }) } />
          </div>
          <button>登入</button>
          <div className="errorMsg">
            { authError ? <p>{authError}</p> : null }
          </div>   
        </form>       

    );
  }
};

// mapDispatchToProps 是一個函數
// 它可以傳入 dispatch, ownProps
// 定義 UI 組件如何發出 action
// 實際上就是要調用 dispatch 這個方法
const mapDispatchToProps = (dispatch)=>{
  return{
    signIn:(creds)=>dispatch(signIn(creds))
  }
}

const mapStateToProps = (state) =>{
  return{
    authError:state.auth.authError,
    auth:state.firebase.auth
    // 抓到UID耶
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(Login)
// export default withRouter(Login);
// 這個是原本的