// 接受或拒絕的那個組件
import React from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom';

// import action
import { AgreeOrRefuseBtn } from './store/actions/sendRequestToTicketAction'
// css

// 可以const兩種不同的state 這樣抓到的資料就會不一樣
class DealResponseDashBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // 回應的結果是 true / false
            applyResponse: false
        };

    }
    componentDidMount() {

    }

    // 同意交換的按鈕
    acceptApplyBtn(e) {
        e.preventDefault();
        alert('已接受交換申請，請自行連絡對方');
        let DocID = e.currentTarget.getAttribute("data-docid");
        let State = e.currentTarget.getAttribute("data-state");
        let UserName = e.currentTarget.getAttribute("data-user-name");
        let Reminder = e.currentTarget.getAttribute("data-reminder-txt");
        let Email = e.currentTarget.getAttribute("data-email");
        let decideDocID = e.currentTarget.getAttribute("data-decide-doc-id");
        this.setState({
            applyResponse: true
        }, (() => {
            this.props.AgreeOrRefuseBtn(
                {
                    acceptOrRefuse: this.state.applyResponse,
                    DocID: DocID,
                    State: State,
                    UserName: UserName,
                    Reminder: Reminder,
                    Email: Email,
                    decideDocID: decideDocID
                }
            )
        })
        );

    }


    // 拒絕交換的按鈕
    refuseApplyBtn(e) {
        e.preventDefault();
        alert('已拒絕交換申請');
        let DocID = e.currentTarget.getAttribute("data-docid");
        let State = e.currentTarget.getAttribute("data-state");
        let UserName = e.currentTarget.getAttribute("data-user-name");
        let Reminder = e.currentTarget.getAttribute("data-reminder-txt");
        let Email = e.currentTarget.getAttribute("data-email");
        let decideDocID = e.currentTarget.getAttribute("data-decide-doc-id");
        this.setState({
            applyResponse: false
        }, (() => {
            this.props.AgreeOrRefuseBtn(
                {
                    acceptOrRefuse: this.state.applyResponse,
                    DocID: DocID,
                    State: State,
                    UserName: UserName,
                    Reminder: Reminder,
                    Email: Email,
                    decideDocID: decideDocID
                }
            )
        })
        );

    }

    render() {
        const { data } = this.props;
        console.log(data.ticketChange)
        let allData = data.ticketChange.decideData;
        let listItems = allData && allData.map((listItem, index) => {
            console.log(listItem.data.ConcertName)
            console.log(listItem.apply)

            // 交換狀態的資料顯示
            let exChangeStatus = listItem.data.initialChangeState;

            if (exChangeStatus === 0) { exChangeStatus = '待交換' }
            else if (exChangeStatus === 1) {
                exChangeStatus = '待回應'
            } else if (exChangeStatus === 2) {
                exChangeStatus = '已結案'
            } else {
                exChangeStatus = '拒絕'
            }

            // 交換方式要轉換成中文
            let exChangeWay = listItem.data.changeWay;
            if (exChangeWay === 'send_package') { exChangeWay = '郵寄' }
            else if (exChangeWay === 'face_to_face') {
                exChangeWay = '面交'
            } else {
                exChangeWay = '其他'
            }
            console.log()
            return (
                <div key={index + listItem.data.docID} className="apply_block_decide">
                    <div className="be_applied_document">
                        <div className="apply_title"><p>
                            <i className="fas fa-signature"></i> 持有票券
                            <span className="docid_small">{listItem.data.docID}</span>
                        </p></div>
                        <div className="imgbox">
                            <img src={listItem.data.url} />
                            
                        </div>
                        <div>
                            <p>{listItem.data.ConcertName}</p>
                            <p>{exChangeWay}｜{exChangeStatus}</p>
                            <p>{listItem.data.selectName + ' ' + listItem.data.selectPrice}</p>
                        </div>
                    </div>
                    
                    {listItem.apply&&listItem.apply.map((item, index) => {
                        let exChangeStatus_applied = item.initialChangeState;
                        if (exChangeStatus_applied === 0) { exChangeStatus_applied = '待交換' }
                        else if (exChangeStatus_applied === 1) {
                            exChangeStatus_applied = '待回應'
                        } else if (exChangeStatus_applied === 2) {
                            exChangeStatus_applied = '已結案'
                        } else {
                            exChangeStatus_applied = '拒絕'
                        }

                        // 交換方式要轉換成中文
                        let exChangeWay_applied = item.changeWay;
                        if (exChangeWay_applied === 'send_package') { exChangeWay_applied = '郵寄' }
                        else if (exChangeWay_applied === 'face_to_face') {
                            exChangeWay_applied = '面交'
                        } else {
                            exChangeWay_applied = '其他'
                        }

                        return (
                            <div className="applicant_list" key={index+'apply'+item.docID}>
                                <div className="apply_title">
                                    <p>
                                        <i className="far fa-sticky-note"></i> 申請交換細節
                                        <span className="docid_small">{item.docID}</span>
                                    </p>
                                </div>
                                <div className="imgbox">
                                    <img src={item.url} />
                                </div>
                                <div className="info_block">
                                    <p>{item.user_name} <span className="docid_small">{item.email}</span></p>
                                    <p>{exChangeWay_applied}｜{exChangeStatus_applied}</p>
                                    <p>持有{item.selectName + ' ' + item.selectPrice}</p>
                                    <p><i className="fas fa-comment-dots"></i> {item.reminderTxt}</p>
                                </div>
                                
                                <div className="bottom_buttons">
                                    <button
                                        onClick={this.acceptApplyBtn.bind(this)}
                                        data-docid={item.docID}
                                        data-decide-doc-id={listItem.data.docID}
                                        data-state={item.initialChangeState}
                                        data-user-name={item.user_name}
                                        data-reminder-txt={item.reminderTxt}
                                        data-email={item.email}>
                                        <i className="fas fa-check"></i> 接受
                                        </button>
                                    <button
                                        onClick={this.refuseApplyBtn.bind(this)}
                                        data-docid={item.docID}
                                        data-decide-doc-id={listItem.data.docID}
                                        data-state={item.initialChangeState}
                                        data-user-name={item.user_name}
                                        data-reminder-txt={item.reminderTxt}
                                        data-email={item.email}>
                                        <i className="fas fa-times"></i> 拒絕
                                        </button>
                                </div>
                            </div>
                        )
                    }
                    )}

                </div>
            )
        })

        return (

            <div>
                <h3 className="profile_title">待處理交換申請</h3>
                <div className="border_decoration"></div>
                <div>
                    {listItems}
                </div>
            </div>
        )

    }
}

function mapDispatchToProps(dispatch) {
    return ({
        AgreeOrRefuseBtn: (responseResult) => dispatch(AgreeOrRefuseBtn(responseResult))
    })
}

export default connect(
    null,
    mapDispatchToProps)(DealResponseDashBoard);