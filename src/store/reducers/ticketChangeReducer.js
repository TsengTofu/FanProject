// 所有跟票券交換的過程有關的資料處理
// 包含紀錄紀錄票券的申請人 申請文件ID  收到申請方的ID 還有文件ID 然後加到新的集合

const initState = {
    apply: '',
    DecideData: '',
    matchApplyDocData: '',
    renderFulldocData: '',
    decideFulldocData: '',
    // 回應申請者的資料
    responseResult:'',
}

const ticketChangeReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_APPLY_DATA_BOTH_USER':
            console.log('成功加入申請單集合的資料', action.apply, action.DecideData);
            // action.dataArray是要傳遞的資料
            return {
                ...state,
                apply: action.apply,
                DecideData: action.DecideData
            }

        case 'GET_USER_APPLICATION_DATA_WAIT_RESPONSE':
            // getAllApplyDataToSpecificUser 對應的 function
            return {
                // ...state,
                matchApplyDocData: action.matchApplyDocData,
                renderFulldocData: action.renderFulldocData,
                decideFulldocData: action.decideFulldocData
            }

        case 'RESPONSE_TO_THE_APPLICANTS':
            return {
                ...state,
                responseResult:action.responseResult
            }

        default:
            return state

    }
    // 這邊是實際在操控state的地方
}


export default ticketChangeReducer;

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