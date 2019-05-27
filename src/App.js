import React from 'react'
import { Route, Redirect, Switch, Link } from "react-router-dom";
import firebase from "./config/firebaseConfig";

// 組件們

import Home from './components/HomePage/Home'
import Menu from './components/LayoutElement/Menu'
import Footer from './components/LayoutElement/Footer'
import BackToTop from './components/LayoutElement/BackToTop'



// css part
import './style.css';
import Logo from './Logo';
import RenderMatch from './components/MatchRelate/RenderMatch';
import MemberProfile from './components/MemberProfile/MemberProfile';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			authenticated: false,
			user: null
		};
	}

	componentDidMount() {
		firebase.auth().onAuthStateChanged(user => {
			if (user) {
				this.setState({
					authenticated: true,
					currentUser: user,
					loading: false
				});
			} else {
				this.setState({
					authenticated: false,
					currentUser: null,
					loading: false
				});
			}
		});
	}


	render() {
		const { authenticated, entry } = this.state;
		return (
			<div>
				
				<Route path="/entry" render={() => !authenticated ? (<Logo />) : (<Redirect to="/" />)} />
				<Route exact path="/" render={() => authenticated ? (<Home />) : (<Redirect to="/entry" />)} />
				<Route path={['/renderMatch', '/member_profile','/']} render={() => !authenticated ? null : (<Menu/>)}  />
				<Switch>
					<Route path="/renderMatch" component={RenderMatch} />
					<Route path="/member_profile" render={() => authenticated ? (<MemberProfile />) : null} />
				</Switch>
				<Route path={['/renderMatch', '/member_profile','/']} render={() => !authenticated ? null : (<BackToTop scrollStepInPx="50" delayInMs="16.66" />)}  />
				<Route path={['/renderMatch', '/member_profile','/']} render={() => !authenticated ? null : (<Footer/>)}  />
			</div>
		);
	}
}

export default App;