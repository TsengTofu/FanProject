import React from 'react'
import Popup from 'reactjs-popup'
import LoginAndSignUpPopup from './LoginAndSignUpPopup' 


// css part
import './Logo.css';
// import ConcertBg from '../img/Concert_bg.jpg'


// 進平台的Logo，要求先加入會員
class Logo extends React.Component {
	render() {		
		return (
            <div className="logo_container">
				<div className="logo">
					<b><i className="fas fa-ticket-alt"></i>  F<span>in</span>d<span> Tic</span>ket</b>
				</div>
				<h3 className="viceTitle">加入會員，有票馬上通知你！</h3>
				<LoginAndSignUpPopup/>
			</div>
		);
	}
}

export default Logo;