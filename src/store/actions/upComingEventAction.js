// 抓資料庫，然後 render 出所有演唱會的資料，建立成 List
export const createupComingEvent = (comingUpEventData) =>{
    // dispatch 是一個 method 調用 action to the reducer
    // return 會有兩個參數
    return (dispatch, getState,{getFirebase,getFirestore}) => {
        // make async call to database
        // 對資料庫作非同步的呼叫，完成之後才會執行下一行程式碼
        const firestore = getFirestore();
        let concertBasicListArray = [];
        firestore.collection('AllConcertBasicData').get()
            .then(querySnapshot => {
                // console.log('AllConcertBasicData', querySnapshot)
                querySnapshot.forEach(doc => {
                    let AllConcertHome = doc.data();
                    // console.log(doc.data())
                    concertBasicListArray.push(AllConcertHome)
                    // console.log(concertBasicListArray)               
                })
            }).then(()=>{
            dispatch({type:'CREATE_UPCOMING_EVENT',concertBasicListArray})
        }).catch((err)=>{
            // dispatch({type:'CREATE_PROJECT_ERROR',err})
        })
    }
}