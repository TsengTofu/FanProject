import { getFirestore } from "redux-firestore";

export const signIn = (credentials) => {
    // 因為有 thunk 我們可以停止 dispatch 的過程
    // 並且 return 一個 function
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then(() => {
                dispatch({ type: 'LOGIN_SUCCESS' })
            }).catch((err) => {
                // 如果登入失敗的話
                dispatch({ type: 'LOGIN_ERROR', err })
            })

    }
}


// 登出
export const signOut = () => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        // 因為是登出 所以不需要給參數
        firebase.auth().signOut().then(() => {
            dispatch({ type: 'SIGNOUT_SUCCESS' })
        }

        )
    }
}

// 註冊
export const signUp = (newUser) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        firebase.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password
        ).then((resp) => {
            // 就有一個叫做users的資料會存起來
            return firestore.collection('users').doc(resp.user.uid).set(
                {
                    // 我想要替使用者增加的'額外'屬性
                    email: newUser.email,
                    user_name: newUser.user_name,
                    phone_number: newUser.phone_number
                    // 這邊的document = uid
                }
            )
        }).then(() => {
            dispatch({ type: 'SIGNUP_SUCCESS' })
        }).catch(err => {
            dispatch({ type: 'SIGNUP_ERROR', err })
        })

    }
}