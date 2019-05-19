// 抓到全部表單的資料 搭配formReducer
export const createAllExchangeData = (AllExchangeData) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        let AllExChangeListArray = [];
        firestore.collection('exchange_form').get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    let AllExchangeInfo = doc.data();
                    AllExChangeListArray.push(AllExchangeInfo);
                    console.log(AllExChangeListArray)
                })
            }).then(() => {
                dispatch({ type: 'CREATE_All_EXCHANGE_DATA', AllExChangeListArray })
            }).catch((err) => {
                // dispatch({type:'CREATE_PROJECT_ERROR',err})
            })
    }
}