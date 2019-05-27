// 進去之後的首頁
import React from 'react';
// 組件

import SearchBar from './SearchBar'
import UpComingEvents from './upComingEvents'
import HomePageBoard from './HomePageBoard'

// css part
import '../HomePage/Home.css';

class Home extends React.Component {
	render() {		
		return (

			
			<div>
				
				<div>   
					<div className="topContent">
						<SearchBar/>
					</div>
					<HomePageBoard/>
					<UpComingEvents/>
				</div>
			</div> 
		);
	}
}




export default Home;