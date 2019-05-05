// 抓使用者填的表單資料 in 會員頁面
// exchange_form 所以要抓這個集合的 符合相對應的會員ID
// 搭配 memberReducer

export const getUserApplyFormData = (memberFormData) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        // const profile = getState().firebase.profile;
        const applyWho = getState().firebase.auth.uid;
        // console.log(`${applyWho}`, '目前的會員，要查詢該會員的申請紀錄');
        let userApplyData = [];
        // 使用者填寫過的交換需求表單
        firestore.collection('exchange_form').where('user_id', '==', `${applyWho}`).get().then(querySnapshot => {
            // console.log(querySnapshot.docs);
            querySnapshot.forEach(doc => {
                // console.log(doc.id);
                // console.log(doc.data());
                let match_User_DocID = doc.id;
                let match_User_DocData = doc.data();
                userApplyData.push({match_User_DocID, match_User_DocData});
                // console.log(userApplyData);
                // console.log(typeof(userApplyData));
            })
            // console.log(userApplyData, "測試一下可不可以抓到");
        }).then(() => {
            dispatch({ type: 'CREATE_USER_PROFILE',userApplyData})
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
        firestore.collection('exchange_form').doc(`${deleteApply}`).delete().then(()=>{
            console.log("文件已經成功刪除");
        }).then(() => {
            dispatch({ type: 'DELETE_USER_APPLY_DATA_IN_MEMBERPAGE',deleteApply})
        })
    }
}