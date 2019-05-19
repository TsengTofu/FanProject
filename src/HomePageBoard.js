// 首頁的全部申請表單 這邊還沒做完
import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
// css part
import './HomaPageBoard.css'
// import action
import { createAllExchangeData } from './store/actions/getAllExchangeFormAction'

class HomePageBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount(AllExchangeData) {
        this.props.createAllExchangeData(AllExchangeData);
    }

    render() {
        const AllExchangeData = this.props.AllExchangeData;
        const items = AllExchangeData && AllExchangeData.map((item) => {
            let exChangeStatus = item.initialChangeState;
            if (exChangeStatus === 0) { exChangeStatus = '待交換' }
            else if (exChangeStatus === 1) {
                exChangeStatus = '待回應'
            } else if (exChangeStatus === 2) {
                exChangeStatus = '已結案'
            } else {
                exChangeStatus = '拒絕'
            }
            let exChangeWay = item.changeWay;
            if (exChangeWay === 'send_package') { exChangeWay = '郵寄' }
            else if (exChangeWay === 'face_to_face') {
                exChangeWay = '面交'
            } else {
                exChangeWay = '其他'
            }
            return (
                <li className="allexchange_form_data" key={item.docID}>
                    <div>
                        <p className="status">{exChangeStatus}</p>
                        <p>{item.ConcertName}</p>
                    </div>
                    <div className="ticket_block">
                        <p>{item.exChangeSelectArea}</p>
                        <span>{item.exChangeSelectPrice}</span>
                    </div>
                    <div className="ticket_block">
                        <p>{item.selectName}</p>
                        <span>{item.selectPrice}</span>
                    </div>
                    <div className="bottom_buttons">				{
                        item.initialChangeState === 2 && <p>Sorry！已結案，無法申請交換</p> || item.initialChangeState !== 2 &&
                        <button data-userid={item.user_id} data-docid={item.docID} data-initstate={item.initialChangeState} data-docid={item.docID} className="send_ExChange_Request_btn" disabled={this.state.letButtonDisabled}
                        // onClick={this.exChangeApplyBtn.bind(this)}
                        >細節</button>
                    }</div>
                    {/* <p>票券持有人｜{item.user_name}</p> */}
                    {/* {item.user_id}{item.phoneNumber}{item.email}{item.queryConcertID}{item.reminderTxt}{item.ConcertPlace} */}
                    {/* 時間 */}
                    {/* <span className="timestamp">{moment(item.createdAt.toDate()).format('MMMM Do YYYY, h:mm:ss a')}</span> */}
                </li>
            )


        });
        return (
            <div className="homepage_exchange_block">
                <h3 className="upComingTitle">全部交換票券清單</h3>
                {/* 最上面的標題 */}
                <div className="category_title">
                    <p>名稱</p>
                    <p>交換</p>
                    <p>持有</p>
                    <p>細節</p>
                </div>
                <ul className="exchange_block_details">
                    {items}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log(state, '首頁的資料')
    return {
        AllExchangeData: state.form.AllExchangeData
    }
}


function mapDispatchToProps(dispatch) {
    return ({
        createAllExchangeData: () => dispatch(createAllExchangeData())
    })
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(HomePageBoard);




