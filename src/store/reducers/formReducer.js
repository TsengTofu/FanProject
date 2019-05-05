const initState = {
    // 演唱會資料 下拉式選單
    formdata:'',
    concerDataAll:'',
    changeFormData:'',
    // 符合條件的data
    renderMatchListData:'',
    // 首頁的搜尋bar
    searchInput:'',
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

            // 另一種方法就是把這個拆成兩個action
 

        default:
            return state
            

     
    }
    // switch statement是什麼
    // 這邊是實際在操控state的地方
}


export default formReducer;


// 這裡都是寫在組件
// Component 裡面 import { connect } from 'react-redux'
// import { firestoreConnect } from 'react-redux-firebase'
// import { compose } from 'redux'
// import { link } from 'react-router-dom'

// connect is a function
// connect 是用來連結組件跟存放state的store，溝通的工具
// const mapStateToProps = (state)=>{
//     return {
//         projects:state.firestore.ordered.project
//     }
// }

// export default compose(connect(mapStateToProps),firestoreConnect([{collection:'projects'}]))(ComponentName)
// 因為它的用意本來就是要連結組件跟store
// firestoreConnect([{collection:'projects'}]) 
// 這段是為了要連結firebase的資料庫 如果有更新就會變成同步

// render(){
//     const { projects } = this.props;　// 只是要宣告 = this.props
//     return(
//     )
// }

// 要做list的話，可以參考這個：
// const ProjectList =({projects})=>{
//     return(
//         <div>
//             {
                // 前面的projects是偵測有沒有抓到state或資料 
//                 projects&&projects.map(project=>{
//                     return(
                        // <link to={'/project/'+ project.id}>
                        //   <div>...</div>
                        // </link>
//                     )
//                 })
//             }
//         </div>
//     )
// }