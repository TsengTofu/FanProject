import React from 'react';
import { withRouter } from "react-router";
import * as firebase from 'firebase/app';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { signUp } from './store/actions/authAction'


// 組件

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      email: '',
      password: '', 
      user_name:'', 
      phone_number:'' 
    };
    this.handleSignUp = this.handleSignUp.bind(this);
  }
  // 這行是原本的寫法
  // async handleSignUp(e) {
  //   e.preventDefault();
  //   const { email, password, user_name } = this.state;
  //   try {
  //     await firebase.auth().createUserWithEmailAndPassword(email, password);
  //     // 這個只接受兩個參數
  //     this.props.history.push('/');
  //     console.log(`註冊成功+${this.state.email}+${this.state.password}+${this.state.user_name}+${this.state.user_phone_number}`);
  //   } catch (error) {
  //     // 這行用來處理錯誤
  //     alert(error);
  //   }
  // }


  handleSignUp(e){
    e.preventDefault();
    console.log(this.state);
    this.props.signUp(this.state);
  }

  render() {
    const { auth, authError } = this.props;
    if(auth.id)return <Redirect to='/home'/>
    return (
        <form className="signup_form" onSubmit={this.handleSignUp}>
            <p>註冊 Sign Up</p>
            <div>
                <label htmlFor="user_name">姓名</label>
                <input id="user_name" value={this.state.user_name} type="text" onChange={ (e) => this.setState({ user_name: e.target.value }) } />
            </div>
            <div>
                <label htmlFor="phone_number">電話</label>
                <input id="phone_number" value={this.state.phone_number} type="text" onChange={ (e) => this.setState({ phone_number: e.target.value }) } />
            </div>
            <div>
                <label htmlFor="email">信箱</label>
                <input id="email" value={this.state.email} type="text" onChange={ (e) => this.setState({ email: e.target.value }) } />
            </div>
            <div>
                <label htmlFor="password">密碼</label>
                <input id="password" value={this.state.password} type="password" onChange={ (e) => this.setState({ password: e.target.value }) } />
            </div>
            <button>註冊</button>
            {/* 錯誤訊息 */}
            <div className="errorMsg">
              { authError ? <p>{authError}</p> : null }
            </div>    
        </form>       
    );
  }
};

const mapDispatchToProps = (dispatch)=>{
  return{
    signUp:(newUser)=>dispatch(signUp(newUser))
  }
}

const mapStateToProps = (state) =>{
  console.log(state)
  // 這邊可以看到firebase的預設功能
  return{
    auth:state.firebase.auth,
    authError:state.auth.authError
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(SignUp)


// export default withRouter(SignUp);
// 這個是原本的