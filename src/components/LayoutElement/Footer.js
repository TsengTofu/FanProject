import React from 'react';
import { Link } from 'react-router-dom';
// 組件

import './Footer.css';

class Footer extends React.Component {
	render() {		
		return (
			<div className="footer_all">    
				<ul className="footer_ul">
					<Link to=''><li>關於我們</li></Link>
					<Link to=''><li>會員條款</li></Link>
					<Link to=''><li>購票須知</li></Link>
					<Link to=''><li>常見問答</li></Link>
					<Link to=''><li>聯絡我們</li></Link>
				</ul>
				<p>Copyright © 2019 Find Ticket All rights reserved.</p>
			</div> 
		);
	}
}

export default Footer;