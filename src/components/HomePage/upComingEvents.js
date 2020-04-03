import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';

// css part
import './upComingEvents.css';

// import action
import { createupComingEvent } from '../../store/actions/upComingEventAction'



class UpComingEvents extends React.Component {

    componentDidMount(comingUpEventData) {
        this.props.createupComingEvent(comingUpEventData);
        // 當我要在function裡面叫action的時候      
    }

    render() {
        const { comingUpEventData } = this.props;
        const items = comingUpEventData && comingUpEventData.map((item) => ( <
            li className = "eventBlock"
            key = { item.concert_id } >
            <
            img src = { item.mainPic }
            /> <
            div className = "activity_details" >
            <
            div className = "hold_date" >

            <
            p className = "day" > { /* condition ? exprT : exprF */ } { `${item.date}`.split('/')[2] } <
            /p> <
            p className = "month_year" > { item.month } { `${item.date}`.split('/')[0] } < /p>								 <
            /div> <
            div className = "activityTitle" > { item.name } { /* {`${item.name}`.toString().slice(0,30).trim().concat('...')} */ } <
            /div>						 <
            div className = "wrap_time_place" >
            <
            p className = "time" > < i className = "far fa-calendar-alt" > < /i> {item.time}</p >
            <
            p className = "place" > < i className = "fas fa-map-marker-alt" > < /i> {item.place}</p >
            <
            /div> <
            /div> <
            div className = "details_btn" > < Link to = '' > 活動詳情 < i className = "fas fa-chevron-right" > < /i></Link > < /div> { /* 這裡現在沒有id 要把li拆出來 連結要連結到新的畫面 */ } <
            /li>
        ));

        return ( <
            div className = "upComing" >
            <
            h3 className = "upComingTitle" > 近期活動 < /h3> <
            ul > { items } <
            /ul> <
            /div>			
        );
    }
}

const mapStateToProps = (state) => {
    return {
        comingUpEventData: state.upComingEvent.comingUpEventData
    }
}


function mapDispatchToProps(dispatch) {
    return ({
        createupComingEvent: () => dispatch(createupComingEvent())
    })
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(UpComingEvents);