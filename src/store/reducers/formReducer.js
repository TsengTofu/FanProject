const initState = {
    // 演唱會資料 下拉式選單
    formdata:'',
    concerDataAll:'',
    changeFormData:'',
    // 符合條件的data
    renderMatchListData:'',
    // 首頁的搜尋bar
    searchInput:'',
    // 首頁的全部資料
    AllExchangeData:''
}


const formReducer = ( state = initState , action ) =>{
    switch(action.type){
        // 可以加上很多case
        case 'CREATE_OPTION':
            console.log('有抓到dataArray的資料',action.dataArray,action.concertArray);
            // action.dataArray是要傳遞的資料
            return{
                ...state,
                // 複製 查一下...代表的語法
                formdata:action.dataArray,
                concerDataAll:action.concertArray
            }

        case 'CREATE_EXCHANGE_FORM_DATA_IN_DATABASE':
            // 提交表單要傳遞的資料
            console.log(action.changeFormData)
            console.log(typeof(action.renderMatchListData))
            console.log(action.renderMatchListData)

            return{
                ...state,
                applyDocumentID:action.applyDocumentID,
                changeFormData:action.changeFormData,
                renderMatchListData:action.renderMatchListData,
                renderMatchListDataID:action.renderMatchListDataID
            }
        case 'CREATE_All_EXCHANGE_DATA':
            return{
                ...state,
                // 全部填寫表單的資料
                AllExchangeData:action.AllExChangeListArray
            }
 

        default:
            return state
            

     
    }
}


export default formReducer;