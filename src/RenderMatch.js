// 把符合搜索條件的資料 render 出來
import React from 'react'
import { connect } from 'react-redux'

// css part
import './RenderMatch.css'

// import action
import { exChangeApplyBtn } from './store/actions/sendRequestToTicketAction'

class RenderMatch extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			// 讓申請者只能點一次
			letButtonDisabled: false,
			// 填寫表單的人的文件資料
			Apply_docID: '',
			Apply_userID: ''
		}
	}

	componentDidMount() {
		// 我這邊應該會有一個action 放在這裡的是用來抓資料的
		// 確保所有的資料都會抓到
		this.setState({
			Apply_docID: this.props.applyDocumentID,
			Apply_userID: this.props.changeFormData.user_id
		})
	}



	// 點到render出來之後的結果的交換按鈕
	exChangeApplyBtn(e) {
		e.preventDefault();
		let deciderDocID = e.currentTarget.getAttribute("data-docid");
		let deciderUserID = e.currentTarget.getAttribute("data-userid");
		this.setState({
			// 讓使用者不能按
			letButtonDisabled : true			
		});
		alert('已提出申請交換！請靜候佳音');
		// console.log(e.currentTarget.getAttribute("data-initstate"));
		// console.log(e.currentTarget.getAttribute("data-docid"));
		// console.log(e.currentTarget.getAttribute("data-userid"));
		// 送出去的資料
		this.props.exChangeApplyBtn(this.state,{deciderDocID:deciderDocID,deciderUserID:deciderUserID});
	}

	render() {
		const { renderMatchListData, changeFormData, applyDocumentID } = this.props;
		const DocumentItems = renderMatchListData && renderMatchListData.map((item, index) => (			
			<li className="renderMatch_block" key={item.user_id}>
				<p className='renderMatch_docID'>{item.docID}</p>
				<img src={item.url} />
				<p className="renderMatch_concert_name">演唱會名稱：{item.ConcertName}</p>
				<p className="renderMatch_concert_place">演唱會地點：{item.ConcertPlace}</p>
				<p className="renderMatch_change">交換方式：
					{
						item.changeWay === 'send_package' && '郵寄' || item.changeWay === 'face_to_face' && '面交' || item.changeWay === 'others_way' && '其他'
					}
				</p>
				<p className="renderMatch_email">對方的信箱：{item.email}</p>
				<p className="renderMatch_change_ticket">對方欲交換票券：{item.exChangeSelectArea + ' ' + item.exChangeSelectPrice}</p>
				<p className="renderMatch_changeState">交換狀態：
					{
						item.initialChangeState === 0 && '等待有緣人交換' || item.initialChangeState === 1 && '等待回應' || item.initialChangeState === 2 && '已結案' || item.initialChangeState === 3 && '拒絕'
					}
				</p>
				<p className="renderMatch_phone">對方的電話：{item.phoneNumber}</p>
				<p className="renderMatch_price">票券的價差：{item.pricePlusTag + item.priceSpread}</p>
				<p className="renderMatch_hold_ticket">對方持有票券：{item.selectName + ' ' + item.selectPrice}</p>
				<p className="renderMatch_reminder">提醒文字：{item.reminderTxt}</p>

				<p className="renderMatch_uid">對方的ID：{item.user_id}</p>

				<p className="renderMatch_name">對方的名字：{item.user_name}</p>
				{
					item.initialChangeState === 2 && <p>Sorry！已結案，無法申請交換</p> || item.initialChangeState !== 2 &&
					<button data-userid={item.user_id} data-docid={item.docID} data-initstate={item.initialChangeState} data-docid={item.docID} className="send_ExChange_Request_btn" disabled={this.state.letButtonDisabled} onClick={this.exChangeApplyBtn.bind(this)}>發送交換請求</button>
				}
			</li>
		)
		)

		return (
			<div className="rendermatch_wrap">
				<ul>
					{DocumentItems}
				</ul>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	// 可以在這裡console看資料有沒有送出來
	// console.log(state);
	return {
		renderMatchListData: state.form.renderMatchListData,
		// 下面這個是要提出交換申請的人
		applyDocumentID: state.form.applyDocumentID,
		changeFormData: state.form.changeFormData
	}
}


function mapDispatchToProps(dispatch) {
	return ({
		// 傳出去的資料是要加到申請單的那個集合裡面
		exChangeApplyBtn: (applyData,DecideData) => dispatch(exChangeApplyBtn(applyData,DecideData))
	})
}

export default connect(mapStateToProps, mapDispatchToProps)(RenderMatch);