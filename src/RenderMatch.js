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
			Apply_userID: '',
			// 這是另外一個要傳遞的資料
			applySearch_docID:'',
			applySearch_userID:''
		}
	}

	componentDidMount() {
		// 我這邊應該會有一個action 放在這裡的是用來抓資料的
		// 確保所有的資料都會抓到
		this.setState({
			Apply_docID: this.props.applyDocumentID,
			Apply_userID: this.props.changeFormData.user_id,
			applySearch_docID:this.props.searchAgainData.docID,
			applySearch_userID:this.props.searchAgainData.userID
		})
	}


	// 點到render出來之後的結果的交換按鈕
	exChangeApplyBtn(e) {
		e.preventDefault();
		let deciderDocID = e.currentTarget.getAttribute("data-docid");
		let deciderUserID = e.currentTarget.getAttribute("data-userid");
		this.setState({
			// 讓使用者不能按  我這邊有處理嗎 
			letButtonDisabled: true
		});
		alert('已提出申請交換！請靜候佳音');
		// console.log(e.currentTarget.getAttribute("data-initstate"));
		// 送出去的資料
		this.props.exChangeApplyBtn(this.state, { deciderDocID: deciderDocID, deciderUserID: deciderUserID });
	}

	render() {
		console.log(this.props.searchAgainData.userID, 'LOOK AT ME')
		const { renderMatchListData, renderMatchListData_search } = this.props;

		// renderMatchListData
		const DocumentItems = renderMatchListData && renderMatchListData.map((item, index) => (
			<li className="renderMatch_block" key={item.user_id}>
				<div className="imgbox">
					<img src={item.url} />
				</div>
				<div>
					<p className="renderMatch_concert_name">{item.ConcertName}</p>
					<span className='renderMatch_docID'>{item.docID}</span>
					<p className="renderMatch_change">
						{
							item.changeWay === 'send_package' && '郵寄' || item.changeWay === 'face_to_face' && '面交' || item.changeWay === 'others_way' && '其他'
						}｜{
							item.initialChangeState === 0 && '待交換' || item.initialChangeState === 1 && '待回應' || item.initialChangeState === 2 && '已結案' || item.initialChangeState === 3 && '拒絕'
						}
					</p>
				</div>
				<div>
					<p className="match_change_ticket">交換｜{item.exChangeSelectArea + ' ' + item.exChangeSelectPrice}</p>
					<p className="match_hold_ticket">持有｜{item.selectName + ' ' + item.selectPrice}</p>
				</div>
				<p className="match_reminder"><i className="fas fa-comment-dots"></i>　{item.reminderTxt}</p>
				<div className="bottom_buttons">				{
					item.initialChangeState === 2 && <p>Sorry！已結案，無法申請交換</p> || item.initialChangeState !== 2 &&
					<button data-userid={item.user_id} data-docid={item.docID} data-initstate={item.initialChangeState} data-docid={item.docID} className="send_ExChange_Request_btn" disabled={this.state.letButtonDisabled} onClick={this.exChangeApplyBtn.bind(this)}>發送交換請求</button>
				}</div>
			</li>
		)
		)


		// 改成 renderMatchListData_search
		const DocumentItems_Search = renderMatchListData_search && renderMatchListData_search.map((item, index) => (
			<li className="renderMatch_block" key={item.user_id}>
				<div className="imgbox">
					<img src={item.url} />
				</div>
				<div>
					<p className="renderMatch_concert_name">{item.ConcertName}</p>
					<span className='renderMatch_docID'>{item.docID}</span>
					<p className="renderMatch_change">
						{
							item.changeWay === 'send_package' && '郵寄' || item.changeWay === 'face_to_face' && '面交' || item.changeWay === 'others_way' && '其他'
						}｜{
							item.initialChangeState === 0 && '待交換' || item.initialChangeState === 1 && '待回應' || item.initialChangeState === 2 && '已結案' || item.initialChangeState === 3 && '拒絕'
						}
					</p>
				</div>
				<div>
					<p className="match_change_ticket">交換｜{item.exChangeSelectArea + ' ' + item.exChangeSelectPrice}</p>
					<p className="match_hold_ticket">持有｜{item.selectName + ' ' + item.selectPrice}</p>
				</div>
				<p className="match_reminder"><i className="fas fa-comment-dots"></i>　{item.reminderTxt}</p>
				<div className="bottom_buttons">				{
					item.initialChangeState === 2 && <p>Sorry！已結案，無法申請交換</p> || item.initialChangeState !== 2 &&
					<button data-userid={item.user_id} data-docid={item.docID} data-initstate={item.initialChangeState} data-docid={item.docID} className="send_ExChange_Request_btn" disabled={this.state.letButtonDisabled} onClick={this.exChangeApplyBtn.bind(this)}>發送交換請求</button>
				}</div>
			</li>
		)
		)


		if (renderMatchListData && renderMatchListData) {
			return (
				<div className="rendermatch_wrap">
					<ul>
						{DocumentItems}
					</ul>
				</div>
			);
		} else if (renderMatchListData_search && renderMatchListData_search) {
			return (
				<div className="rendermatch_wrap">
					<ul>
						{DocumentItems_Search}
					</ul>
				</div>
			);
		}

	}
}

const mapStateToProps = (state) => {
	// console.log(state); console看資料有沒有送出來
	return {
		renderMatchListData: state.form.renderMatchListData,
		// 再次搜索的抓到的資料
		renderMatchListData_search: state.memberDataBase.renderMatchListData_search,
		// 下面這個是要提出交換申請的人
		applyDocumentID: state.form.applyDocumentID,
		changeFormData: state.form.changeFormData,
		searchAgainData:state.memberDataBase.searchAgainData
	}
}


function mapDispatchToProps(dispatch) {
	return ({
		// 傳出去的資料是要加到申請單的那個集合裡面
		exChangeApplyBtn: (applyData, DecideData) => dispatch(exChangeApplyBtn(applyData, DecideData))
	})
}

export default connect(mapStateToProps, mapDispatchToProps)(RenderMatch);