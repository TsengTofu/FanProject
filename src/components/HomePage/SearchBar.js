import React from 'react'
import ChangeFormPopUp from './ChangeFormPopUp'
// css part
import './SearchBar.css';

import { connect } from 'react-redux'
import {searchBarAction} from '../../store/actions/SearchBarAction'

class SearchBar extends React.Component {
	constructor(props) {
		super(props);	
		// this.newGame = this.newGame.bind(this);
	}
	
	render() {		
		return (
            <div>
				<div className="searchbar">
                	<input type="text" placeholder="想找誰的演唱會門票呢？"/>
                	<i className="fas fa-search searchIcon"/>
				</div>
				<ChangeFormPopUp/>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
	//   formdata:state.auth.formdata
	}
  }
  
  
  function mapDispatchToProps(dispatch) {
	return ({
		searchBarAction: () => dispatch(searchBarAction())
	})
  }
  
   export default connect(
	mapStateToProps,mapDispatchToProps
   )(SearchBar);
  
  