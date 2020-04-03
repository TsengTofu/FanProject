export const searchBarAction = (searchInput) =>{
    return (dispatch, getState,{getFirebase,getFirestore}) => {
        // {getFirebase,getFirestore} 這是為了要跟database連結
        // make async call to database
        const firestore = getFirestore()
        // 對資料庫作非同步的呼叫，完成之後才會執行下一行程式碼，三個action都不同

        // let dataArray =[];
        // 搜尋bar演唱會的資料
        firestore.collection('AllConcertBasicData').get()
        .then(querySnapshot=>{
            console.log('AllConcertBasicData',querySnapshot)
            querySnapshot.forEach(doc=>{
                console.log(doc.data())
                console.log(typeof(doc.data()))
                // dataArray.push(datasharchingtung)
                // dispatch({type:'CREATE_OPTION_2',datachencheer})                 
            })            
        }).then(()=>{
            // dispatch({type:'CREATE_CONCERT_NAME_PLACE',dataArray})
        }).catch((err)=>{
            // dispatch({type:'CREATE_PROJECT_ERROR',err})
        })
    }
}

