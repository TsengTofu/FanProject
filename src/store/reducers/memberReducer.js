const initState = {
    memberFormData:'',
    deleteApply:'',
    searchAgainData:'',
    renderMatchListData_search:''
}

const memberReducer = ( state = initState , action ) =>{
    switch(action.type){
        // 抓到 USER 全部的相關資料       
        case 'CREATE_USER_PROFILE':
            console.log('有抓到的資料',action.userApplyData);
            // action.dataArray是要傳遞的資料
            return{
                ...state,
                memberFormData:action.userApplyData
            }

        case 'DELETE_USER_APPLY_DATA_IN_MEMBERPAGE':
            // 刪除 memberpage 裡面的最開始填表的資料
            return{
                ...state,
                memberFormData:action.userApplyData,
                deleteApply:action.deleteApply
                // 加這行就可以同步刪除
            }
        
        case 'SEARCH_AGAIN_BUTTON':
        // 再次搜索的功能
            return{
                ...state,
                searchAgainData:action.searchAgainData,
                renderMatchListData_search:action.renderMatchListData_search
            }

        default:
            return state
 
    }
    // 這邊是實際在操控state的地方
}


export default memberReducer;