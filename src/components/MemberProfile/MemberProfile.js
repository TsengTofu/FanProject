// 會員頁面 基礎資料
import React from 'react'
import { connect } from 'react-redux'
import '../MemberProfile/MemberProfile.css'

// import action
import { getUserApplyFormData } from '../../store/actions/GetUserFormDataAction'
import { getAllApplyDataToSpecificUser } from '../../store/actions/sendRequestToTicketAction'

// 組件

// 會員的填寫資料組件
import MemberProfileApplyData from './MemberProfileApplyData'

import DealResponseDashBoard from './DealResponseDashBoard'

// 會員的交換申請紀錄組件

// css part
class MemberProfile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			// active:false
		}
	}

	componentDidMount(memberFormData, getAllApplyData) {
		this.props.getAllApplyDataToSpecificUser(getAllApplyData);
		this.props.getUserApplyFormData(memberFormData);
		// 在function裡面叫action的時候

	}

	render() {
		// console.log(this.props.renderFulldocData[0])
		// console.log(this.props.renderFulldocData[1])
		// 第二筆資料真的是抓不到耶

		return (
			// 會員資訊
			<div className="profile_basic">
				<h3 className="profile_title">會員基本資訊</h3>
				<div className="border_decoration"></div>
				<div className="profile">
					<div className="picture">
						<img className="profile_picture" />
					</div>
					<div className="details">
						<p>姓名｜{this.props.profile.user_name}　<span>{this.props.auth.uid}</span></p>
						<p>E-mail｜{this.props.auth.email}</p>
						<p>電話號碼｜{this.props.profile.phone_number}</p>
					</div>
				</div>
				<MemberProfileApplyData data={this.props} />
				<DealResponseDashBoard data={this.props} />
			</div>
		);
	}
}


const mapStateToProps = (state) => {
	// console.log(state.ticketChange.renderFulldocData[0])
	// console.log(state.ticketChange.renderFulldocData[1])
	return {
		auth: state.firebase.auth,
		profile: state.firebase.profile,
		memberFormData: state.memberDataBase.memberFormData,
		ticketChange: state.ticketChange,
		// 不要這樣寫↓
		// ticketChange: state.ticketChange.matchApplyDocData,
		// renderFulldocData: state.ticketChange.renderFulldocData,
		// decideFulldocData: state.ticketChange.decideFulldocData
	}
}


function mapDispatchToProps(dispatch) {
	return ({
		getAllApplyDataToSpecificUser: (getAllApplyData) => dispatch(getAllApplyDataToSpecificUser(getAllApplyData)),
		getUserApplyFormData: (memberFormData) => dispatch(getUserApplyFormData(memberFormData))

	})
}

export default connect(
	mapStateToProps, mapDispatchToProps
)(MemberProfile);


