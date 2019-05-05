export const createEXChangeFormData = (changeFormData) => {
    // dispatch 是一個 method 調用 action to the reducer
    // return 會有兩個參數
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        // {getFirebase,getFirestore} 這是為了要跟database互動
        // make async call to database
        // 對資料庫作非同步的呼叫，完成之後才會執行下一行程式碼
        const firestore = getFirestore();
        // 這個是文件ID
        let renderMatchListData = [];
        // 宣告儲存要 render 資料的陣列
        firestore.collection('exchange_form').add({
            // 設定的collection名稱，add()裡面要放一個object 這裡面出現的會是單一的document
            ...changeFormData,
            createdAt: new Date()
        }).then((docRef)=>{
            console.log(docRef.id,'安安我是這份文件的ID喔');
            // 這份申請文件的ID
            let applyDocumentID = docRef.id;
            let concertID = changeFormData.queryConcertID;
            let exChangeArea = changeFormData.exChangeSelectArea;
            let exChangePrice = changeFormData.exChangeSelectPrice;
            let holdArea = changeFormData.selectName;
            let holdPrice = changeFormData.selectPrice;
            let dataUser = changeFormData.user_id;
            // // 宣告儲存要 render 資料的陣列
            // orederby 處理最新的資料排序
            // limit 可以控制資料量 大概就是排序 然後最新的100筆這樣
            firestore.collection('exchange_form').where('queryConcertID', '==', `${concertID}`).where('selectName', '==', `${exChangeArea}`).where('selectPrice', '==', `${exChangePrice}`).where('exChangeSelectArea', '==', `${holdArea}`).where('exChangeSelectPrice', '==', `${holdPrice}`).get().then(querySnapshot => {
                // console.log(querySnapshot.docs);
                querySnapshot.forEach(doc => {
                    // console.log(doc.id);
                    // console.log(doc.data());
                    // karen 是說把它存到新的陣列，然後透過 reducer 處理
                    // renderMatchListDataID
                    let matchDocID = doc.id;
                    let matchDocData = doc.data();
                    // console.log(doc.data().user_id);
                    // console.log(`${dataUser}`);
                    if (doc.data().user_id !== `${dataUser}`) {
                        // renderMatchListData.push(matchDocData);
                        // console.log(typeof(matchDocData))
                        matchDocData.docID = matchDocID;
                        // 上面這個是嘗試把ID加到同一個陣列裡面
                        renderMatchListData.push(matchDocData);
                        console.log(renderMatchListData)
                    }
                })
                dispatch({ type: 'CREATE_EXCHANGE_FORM_DATA_IN_DATABASE', applyDocumentID,changeFormData, renderMatchListData
            })
                if(renderMatchListData.length!==0){
                    window.location.hash = '/renderMatch';
                }else{
                    window.location.hash = '/member_profile';
                }
                // amy 說如果要不改變資料狀態 必須加hash 不然重新整理就會initState
            })
        })
    }
}

































