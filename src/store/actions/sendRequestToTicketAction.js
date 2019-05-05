// 在會員頁面上點選申請交換Action
// exChangeApplyBtn 填完表單 > 搜索 > render表單的交換按鈕
// 抓到彼此的 UID (user_id) + DOC ID + 該文件的交換狀態 initialChangeState
// 傳到 firestore (因為確定都是存在的 所以不用判斷是否存在)
// 因為每一張票都會有申請人 票券DOC ID = 集合裡面的DOC ID
// 裡面放陣列抓到提出申請的人的ID 還有 DOC ID 

export const exChangeApplyBtn = (applyData, DecideData) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        // const applyWho = getState().firebase.auth.uid;
        // console.log(`${applyWho}`, '目前正在搜索的會員');
        // console.log(applyData.Apply_userID,'申請者的ID')
        // console.log(applyData.Apply_docID,'申請者的文件ID')

        // console.log(DecideData.deciderUserID,'被申請者的ID')
        // console.log(DecideData.deciderDocID,'被申請者的文件ID，是他要變成集合名稱')
        // 申請者的陣列
        // [{docID:xxx,userID:xxx},{docID:xxx,userID:xxx}]
        let apply = [];
        let applyuserID = applyData.Apply_userID;
        let applydocID = applyData.Apply_docID;
        let deciderDocID = DecideData.deciderDocID;
        // 先抓到申請的那個文件，把狀態改成 1
        firestore.collection('exchange_form').doc(`${applydocID}`).update({ initialChangeState: 1 }).then(console.log(`${applydocID}`, '這份文件已經initialChangeState已經改成1囉'))
        // 這邊抓到各自的資料
        // 目的是索引，可以限制搜索的範圍，不用再去搜索全部的 exchange_form

        // 如果 ApplicationForm_context 裡面的 找的到對應的 doc 就update array [] 
        firestore.collection('ApplicationForm_context').doc(`${deciderDocID}`).get().then(docSnapshot => {
            if (docSnapshot.exists) {
                firestore.collection('ApplicationForm_context').doc(`${deciderDocID}`).update({
                    apply: firestore.FieldValue.arrayUnion({ Apply_userID: applyuserID, Apply_docID: applydocID })
                }).then(() => {
                    dispatch({ type: 'CREATE_APPLY_DATA_BOTH_USER', apply, DecideData })
                    // window.location.hash = '/member_profile';
                })
            } else {
                apply.push(applyData);
                console.log(apply, '這是文件不存在的狀況!!!')
                firestore.collection('ApplicationForm_context').doc(`${deciderDocID}`).set({
                    apply,
                    ...DecideData
                }).then(() => {
                    dispatch({ type: 'CREATE_APPLY_DATA_BOTH_USER', apply, DecideData })
                    // window.location.hash = '/member_profile';
                })
            }
        });
    }
}



// 收到申請的那方會看到的所有資料-----------------------------------------------------------------
export const getAllApplyDataToSpecificUser = (getAllApplyData) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const currentWho = getState().firebase.auth.uid;
        // 所有有申請的文件docID
        let renderDocList = [];
        // 所有申請的文件的 全部資訊
        let renderFulldocData = [];
        // 被申請的文件的資訊
        let decideFulldocData = [];

        console.log(currentWho, '現在的使用者ID');
        // 現在的使用者是誰
        firestore.collection('ApplicationForm_context').where('deciderUserID', '==', `${currentWho}`).get().then(
            querySnapshot => {
                querySnapshot.forEach(doc => {
                    let matchApplyDocID = doc.id;
                    let matchApplyDocData = doc.data();
                    // console.log(matchApplyDocID, '被申請的文件ID')
                    firestore.collection('exchange_form').doc(`${matchApplyDocID}`).get().then(
                        querySnapshot => {
                            let data = querySnapshot.data();
                            data.docID = matchApplyDocID;
                            decideFulldocData.push(data);
                        }
                    )
                    // console.log(decideFulldocData)
                    // console.log(matchApplyDocData, '透過集合抓到的資料');
                    // console.log(matchApplyDocData.apply, 'apply的那個陣列')
                    matchApplyDocData.apply.map((item) => {
                        console.log(item.Apply_docID)
                        renderDocList.push(item.Apply_docID);
                    })
                    // console.log(renderDocList, 'All Apply docID,提出申請的文件，因為資料集合就包含使用者，所以沒有user-id也沒關係')
                    // 這邊要針對 全部 的文件去搜尋
                    for (let i = 0; i < renderDocList.length; i++) {
                        firestore.collection('exchange_form').doc(`${renderDocList[i]}`).get().then(
                            querySnapshot => {
                                let applydocID = querySnapshot.id;
                                let applydocData = querySnapshot.data();
                                // 這行是要直接推到物件裡面
                                applydocData.docID = applydocID;
                                renderFulldocData.push(applydocData);
                                dispatch({ type: 'GET_USER_APPLICATION_DATA_WAIT_RESPONSE', renderFulldocData,matchApplyDocData,decideFulldocData })
                            }

                            
                        // ).then(() => {
                        //     dispatch({ type: 'GET_USER_APPLICATION_DATA_WAIT_RESPONSE', renderFulldocData, matchApplyDocData, decideFulldocData })
                        //     console.log(renderFulldocData, matchApplyDocData, decideFulldocData)
                        // })
                        )}
                })
            }
        )
    }
}


// 接受或拒絕的按鈕-----------------------------------------------------------------
// 一次可以更改全部的狀態,只要按鈕被按了就要觸發
export const AgreeOrRefuseBtn = (responseResult) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        console.log('只要執行一次就會看到我XD')

        // console.log(responseResult, '回傳的資料');
        // console.log(responseResult.decideDocID, '要決定的那個文件ID');
        // console.log(responseResult.DocID, '被接受或拒絕的文件ID');
        // console.log(responseResult.Email, '被接受或拒絕的email');
        // console.log(responseResult.State, '被接受或拒絕的文件資料狀態');
        // console.log(responseResult.acceptOrRefuse, 'F 拒絕 T 同意');
        // console.log(responseResult.Reminder, '被接受或拒絕的提示文字');
        // console.log(responseResult.UserName, '被接受或拒絕的名字');

        let decideDocID = responseResult.decideDocID;
        let DocID = responseResult.DocID;
        let result = responseResult.acceptOrRefuse;

        if (result === true) {
            firestore.collection('exchange_form').doc(`${DocID}`).update({ initialChangeState: 2 })
            firestore.collection('exchange_form').doc(`${decideDocID}`).update({ initialChangeState: 2 })
        }else{
            firestore.collection('exchange_form').doc(`${DocID}`).update({ initialChangeState: 3 })
            firestore.collection('exchange_form').doc(`${decideDocID}`).update({ initialChangeState: 3 })
        }
        dispatch({ type: 'RESPONSE_TO_THE_APPLICANTS', responseResult })
    }
}