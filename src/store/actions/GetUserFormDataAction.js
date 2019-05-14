// 抓使用者填的表單資料 in 會員頁面 memberReducer
// exchange_form 所以要抓這個集合的 符合相對應的會員ID
export const getUserApplyFormData = (memberFormData) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const applyWho = getState().firebase.auth.uid;
        // console.log(`${applyWho}`, '目前的會員，要查詢該會員的申請紀錄');
        let userApplyData = [];
        // 使用者填寫過的交換需求表單
        firestore.collection('exchange_form').where('user_id', '==', `${applyWho}`).get().then(querySnapshot => {
            // console.log(querySnapshot.docs);
            querySnapshot.forEach(doc => {
                let match_User_DocID = doc.id;
                let match_User_DocData = doc.data();
                userApplyData.push({ match_User_DocID, match_User_DocData });
            })
        }).then(() => {
            dispatch({ type: 'CREATE_USER_PROFILE', userApplyData })
        }).catch((err) => {
            // dispatch({type:'CREATE_PROJECT_ERROR',err})
        })
    }
}


// 會員頁面刪除申請交換的功能 MemberProfileApplyData的刪除功能
export const deleteUserApplyData = (deleteApply) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        // 找到對應資料之後 刪除document
        firestore.collection('exchange_form').doc(`${deleteApply}`).delete().then(() => {
            console.log("文件已經成功刪除");
        }).then(() => {
            dispatch({ type: 'DELETE_USER_APPLY_DATA_IN_MEMBERPAGE', deleteApply });
        })
    }
}



// 會員頁面再次搜索功能
export const searchDataAgainBtn = (searchAgainData) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        // 這個是搜尋對應的
        const {
            docID: docID,
            exChangeSelectArea: exChangeSelectArea,
            exChangeSelectPrice: exChangeSelectPrice,
            queryConcertID: queryConcertID,
            selectName: selectName,
            selectPrice: selectPrice,
            userID: userID
        } = searchAgainData;
        console.log(userID, '看看有沒有抓到');
        const firestore = getFirestore();
        // 這邊重複地宣告
        let renderMatchListData_search = [];
        firestore.collection('exchange_form').where('queryConcertID', '==', `${queryConcertID}`).where('selectName', '==', `${exChangeSelectArea}`).where('selectPrice', '==', `${exChangeSelectPrice}`).where('exChangeSelectArea', '==', `${selectName}`).where('exChangeSelectPrice', '==', `${selectPrice}`).get().then(
            querySnapshot => {
                // console.log(querySnapshot.docs);
                querySnapshot.forEach(
                    doc => {
                        // 有重複的宣告
                        let matchDocID = doc.id;
                        let matchDocData = doc.data();
                        if (doc.data().user_id !== `${userID}`) {
                            matchDocData.docID = matchDocID;
                            renderMatchListData_search.push(matchDocData);
                        }
                    }
                )
                dispatch({
                    type: 'SEARCH_AGAIN_BUTTON',
                    // 搜到的結果資料
                    renderMatchListData_search,searchAgainData
                    // 這邊要多一個資料
                })
                if (renderMatchListData_search.length !== 0) {
                    window.location.hash = '/renderMatch';
                } else {
                    window.location.hash = '/member_profile';
                }
            }
        )
    }
}

