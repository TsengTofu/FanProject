// 連動選單的資料
import { connect } from "redux";

export const changeFormAction = (formdata,concerDataAll) => {
    // dispatch 是一個 method 調用 action to the reducer
    // return 會有兩個參數
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        // {getFirebase,getFirestore} 這是為了要跟database連結
        // make async call to database
        const firestore = getFirestore()
        // 對資料庫作非同步的呼叫，完成之後才會執行下一行程式碼，三個action都不同
        let concertArray = [];
        let dataArray = [];

        // 演唱會名稱跟地區（目前先不管場次）
        firestore.collection('AllConcertBasicData').get()
            .then(querySnapshot => {
                // console.log('AllConcertBasicData', querySnapshot)
                querySnapshot.forEach(doc => {
                    let dataAllConcert_form = doc.data();
                    // console.log(doc.data())
                    // console.log(typeof (doc.data()))
                    concertArray.push(dataAllConcert_form)
                    // dispatch({type:'CREATE_OPTION_2',datachencheer})                 
                })
            })
        // ---------------------------------------------------------
        // 演唱會的表單座位資料
        // exo
        firestore.collection('exo').get()
            .then(querySnapshot => {
                // console.log('exo', querySnapshot)
                querySnapshot.forEach(doc => {
                    let dataEXO = doc.data();
                    // console.log(doc.data())
                    dataArray.push(dataEXO)
                })
            })
        // fayuching
        firestore.collection('fayuching').get()
            .then(querySnapshot => {
                // console.log('fayuching', querySnapshot)
                querySnapshot.forEach(doc => {
                    let datafayuching = doc.data();
                    // console.log(doc.data())
                    dataArray.push(datafayuching)
                    // dispatch({type:'CREATE_OPTION_2',datachencheer})                 
                })
            })
        // jj
        // 這邊暫時不抓資料
        firestore.collection('jj').get()
            .then(querySnapshot => {
                // console.log('jj', querySnapshot)
                querySnapshot.forEach(doc => {
                    let datajj = doc.data();
                    // console.log(doc.data())
                    dataArray.push(datajj)
                    // dispatch({type:'CREATE_OPTION_2',datachencheer})                 
                })
            })

        // sharchingtung
        // 這邊暫時不抓資料
        firestore.collection('sharchingtung').get()
            .then(querySnapshot => {
                // console.log('sharchingtung', querySnapshot)
                querySnapshot.forEach(doc => {
                    let datasharchingtung = doc.data();
                    // console.log(doc.data())
                    dataArray.push(datasharchingtung)
                    // dispatch({type:'CREATE_OPTION_2',datachencheer})                 
                })
            })
        
        // chencheer
        firestore.collection('chencheer').get()
            .then(querySnapshot => {
                // console.log('chencheer', querySnapshot)
                querySnapshot.forEach(doc => {
                    let datachencheer = doc.data();
                    // console.log(doc.data())
                    dataArray.push(datachencheer)
                    // dispatch({type:'CREATE_OPTION_2',datachencheer})                 
                })
            }).then(() => {
                dispatch({ type: 'CREATE_OPTION', dataArray,concertArray})
            }).catch((err) => {
                // dispatch({type:'CREATE_PROJECT_ERROR',err})
            })
    }
}

