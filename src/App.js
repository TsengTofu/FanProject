import React from 'react'
import { Route, Redirect, Switch} from "react-router-dom";
import firebase from "./config/firebaseConfig";

// 組件們

import Home from './components/HomePage/Home'
import Menu from './components/LayoutElement/Menu'
import Footer from './components/LayoutElement/Footer'
import BackToTop from './components/LayoutElement/BackToTop'
import BuyTicketExplain from '../src/components/WebsiteDeclare/BuyTicketExplain'
import MemberShipRules from '../src/components/WebsiteDeclare/MemberShipRules'
import Faq from '../src/components/WebsiteDeclare/Faq'
import AboutUs from '../src/components/WebsiteDeclare/AboutUs'

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
		const { authenticated} = this.state;
		return (
			<div>
				
				<Route path="/entry" render={() => !authenticated ? (<Logo />) : (<Redirect to="/" />)} />
				<Route exact path="/" render={() => authenticated ? (<Home />) : (<Redirect to="/entry" />)} />
				<Route path={['/renderMatch', '/member_profile','/']} render={() => !authenticated ? null : (<Menu/>)}  />
				<Switch>
					<Route path="/aboutus" component={AboutUs} />
					<Route path="/faq" component={Faq} />
					<Route path="/membershiprules" component={MemberShipRules} />
					<Route path="/buyticketexplain" component={BuyTicketExplain} />
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