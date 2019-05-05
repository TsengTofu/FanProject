import { connect } from "redux";

// // 這個只是action的參考檔案---第一種寫法
// export const createProject = (project) => {
//     // (project) we receive into this action creator
//     return{
//         // return一個object
//         type: 'ADD_PROJECT',
//         project:project
//     }
// }

// Q：要在action裡面抓資料嗎


export const createProject = (project) =>{
    // dispatch 是一個 method 調用 action to the reducer
    // return 會有兩個參數
    return (dispatch, getState,{getFirebase,getFirestore}) => {
        // {getFirebase,getFirestore} 這是為了要跟database互動
        // make async call to database
        // 對資料庫作非同步的呼叫，完成之後才會執行下一行程式碼
        const firestore = getFirestore();
        // 為了跟firebase做連結
        firestore.collection('').add({
        // 我自己設定的collection名稱
        // add()裡面要放一個object 這裡面出現的會是單一的document
            ...project,
            authorFirstName:'',
            authorLastName:'',
            authorId:'',
            createdAt:new Date()
            // 這邊目前是寫死的資料
        }).then(()=>{
            dispatch({type:'CREATE_PROJECT',project:project})
        }).catch((err)=>{
            dispatch({type:'CREATE_PROJECT_ERROR',err})
        })
        
        
    }
}

// 之後再回到component裡面，把在action資料夾裡面的 createProject引入
// import {createProject} from ./src.js
// import {connect} from 'react-redux'

// 在組件的最後，但這邊我不太懂
//  #14 8:22
// mapDispatchToProps這是一個function
const mapDispatchToProps = (dispatch) =>{
    return{
        createProject: (project) => dispatch(createProject(project))
    }
}
export default connect(null,mapDispatchToProps)(CreateProject)







// JIM CODE---------------------------
// 這是沒有firebase的寫法
const mapStateToProps = state => {
    return { jobs: state, bbbb: state.current_page };
   };
   
   // export default Contents;
   
   export default connect(
    mapStateToProps,
    { fetch_yourator: fetch_yourator }
   )(Contents);

// 如果我要改變reducer裡面的資料 要透過action
// 讀資料(getState) this.props (前提是要conncet redux / mapStateToProps)


