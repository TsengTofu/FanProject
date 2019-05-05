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

    // 寫兩個按鈕都連一個action 在action裡面判斷 state 是 true / false 


    render() {
        const { data } = this.props;
        let theDocApplicantAllData = data.ticketChange.renderFulldocData;
        let theDecideDOC = data.ticketChange.decideFulldocData;
        console.log(data.ticketChange, '看一下全部的人的資料')
        // 單筆被申請的文件
        console.log(theDecideDOC)
        let listItems = theDecideDOC && theDecideDOC.map((listItem, index) => {
            // 交換狀態的資料顯示
            console.log(listItem)
            
            let exChangeStatus = listItem.initialChangeState;

            if (exChangeStatus === 0) { exChangeStatus = '等待有緣人交換' }
            else if (exChangeStatus === 1) {
                exChangeStatus = '等待回應'
            } else if (exChangeStatus === 2) {
                exChangeStatus = '已結案'
            } else {
                exChangeStatus = '拒絕'
            }

            // 交換方式要轉換成中文
            let exChangeWay = listItem.changeWay;
            if (exChangeWay === 'send_package') { exChangeWay = '郵寄' }
            else if (exChangeWay === 'face_to_face') {
                exChangeWay = '面交'
            } else {
                exChangeWay = '其他'
            }

            return (
                <div key={index + listItem.docID} className="apply_block_decide">
                    <div className="be_applied_document">
                        <div className="apply_title"><p>
                            <i className="fas fa-signature"></i> 持有票券
                            <span className="docid_small">{listItem.docID}</span>
                        </p></div>
                        <div className="imgbox">
                            <img src={listItem.url} />
                        </div>
                        <div>
                            <p>{listItem.ConcertName}</p>
                            <p>{exChangeWay}｜{exChangeStatus}</p>
                            <p>{listItem.selectName + ' ' + listItem.selectPrice}</p>
                        </div>
                    </div>
                    {console.log(theDocApplicantAllData)}
                    
                    {theDocApplicantAllData && theDocApplicantAllData.map((item,index) => {
                        console.log(item)
                        // 交換狀態顯示中文
                        let exChangeStatus_applied = item.initialChangeState;
                        if (exChangeStatus_applied === 0) { exChangeStatus_applied = '等待有緣人交換' }
                        else if (exChangeStatus_applied === 1) {
                            exChangeStatus_applied = '等待回應'
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
                            <div className="applicant_list" key={index + 'apply' + item.docID}>
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
                                        data-decide-doc-id={listItem.docID}
                                        data-state={item.initialChangeState}
                                        data-user-name={item.user_name}
                                        data-reminder-txt={item.reminderTxt}
                                        data-email={item.email}>
                                        <i className="fas fa-check"></i> 接受
                                        </button>
                                    <button
                                        onClick={this.refuseApplyBtn.bind(this)}
                                        data-docid={item.docID}
                                        data-decide-doc-id={listItem.docID}
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


        // 介面：要有提示已經不能選擇，或是已發送通知的提示，要可以移到歷史紀錄 或是顯示結案
        // 每種交換狀態要有特定的設計highlight 就是夠明確 因為改完狀態就代表所有的文件在抓會員申請的時候 都會自動吃到最新的狀態
        // 所以不需要一個一個去指定  麻煩的地方是要針對特定情況去顯示特定的設計畫面

        // ----
        // 先抓到哪個 doc id 被選到 YES 接受 並抓到整份被選到文件的資料 action裡面寫 if 判斷式去做資料判斷
        // decide 的那份文件 id 也要抓出來 
        // 應該每份文件都要抓出來放在陣列裡面 每份文件都有自己的 接受或拒絕的狀態 但裡面只要有一個Y 其他就會變成N 因為只有一張票
        // 所以我還是要先抓出全部文件的陣列?





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