// 首頁的全部申請表單 這邊還沒做完
import React from 'react'
import { connect } from 'react-redux'
// css part

// import action
// import { createupComingEvent } from './store/actions/upComingEventAction'

class HomePageBoard extends React.Component {
    constructor(props) {
        super(props);
    }


    componentDidMount(comingUpEventData) {
        // this.props.createupComingEvent(comingUpEventData);    
    }

    render() {
        // const items = comingUpEventData && comingUpEventData.map((item) => (
        //     <li className="eventBlock" key={item.concert_id}>

        //     </li>
        // ));

        return (
            <div className="all_apply_data">
                <h3 className="">All Apply Data測試</h3>
                <ul>

                </ul>
            </div>
        );
    }
}

// const mapStateToProps = (state) => {
//     return {
//         comingUpEventData:state.upComingEvent.comingUpEventData
//     }
// }


// function mapDispatchToProps(dispatch) {
//     return ({
//         createupComingEvent: () => dispatch(createupComingEvent())
//     })
// }

export default connect(
    // mapStateToProps, mapDispatchToProps
)(HomePageBoard);




