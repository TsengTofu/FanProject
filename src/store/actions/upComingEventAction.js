// 抓所有演唱會的資料 render ，建立成 List
export const createupComingEvent = (comingUpEventData) =>{
    return (dispatch, getState,{getFirebase,getFirestore}) => {
        const firestore = getFirestore();
        let concertBasicListArray = [];
        firestore.collection('AllConcertBasicData').get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    let AllConcertHome = doc.data();
                    concertBasicListArray.push(AllConcertHome);
                    // console.log(concertBasicListArray)               
                })
            }).then(()=>{
            dispatch({type:'CREATE_UPCOMING_EVENT',concertBasicListArray})
        }).catch((err)=>{
            // dispatch({type:'CREATE_PROJECT_ERROR',err})
        })
    }
}