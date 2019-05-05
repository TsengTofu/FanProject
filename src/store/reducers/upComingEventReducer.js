// 這個是要抓演唱會的基礎資料 render 到首頁
const initState = {
    // 所有演唱會的基礎資料
    comingUpEventData:''
}

const upComingEventReducer = ( state = initState , action ) =>{
    switch(action.type){
        // 可以加上很多case
        case 'CREATE_UPCOMING_EVENT':
            console.log('有抓到全部演唱會的資料!!!!',action.concertBasicListArray);
            // action.dataArray是要傳遞的資料
            return{
                ...state,
                comingUpEventData:action.concertBasicListArray
            }
        default:
            return state
    }
    // 這邊是實際在操控state的地方
}


export default upComingEventReducer;


