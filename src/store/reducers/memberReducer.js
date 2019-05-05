const initState = {
    memberFormData:'',
    deleteApply:''
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
            // console.log();
            return{
                ...state,
                deleteApply:action.deleteApply
            }
        default:
            return state
 
    }
    // 這邊是實際在操控state的地方
}


export default memberReducer;


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