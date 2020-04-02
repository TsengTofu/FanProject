import { auth } from "firebase";

const initState = {
    authError:null,

}

const authReducer = (state = initState,action) =>{
    switch(action.type){
        // 透過 action 傳回來的東西 reducer 處理
        case 'LOGIN_ERROR':
            console.log('登入失敗')
            return {
                ...state,
                authError:'帳號或密碼錯誤，請重新輸入。'           
            }
        
        case 'LOGIN_SUCCESS':
            console.log('登入成功')
            return{
                ...state,
                authError:null
            }

        // 登出
        case 'SIGNOUT_SUCCESS':
            console.log('成功登出');
            return state;
        // 註冊
        case 'SIGNUP_SUCCESS':
            console.log('註冊成功');
            return{
                ...state,
                authError:null
            }
        
        case 'SIGNUP_ERROR':
            console.log('註冊失敗');
            return{
                ...state,
                authError:action.err.message
                // 我們希望他出現確切的錯誤訊息
            }


        default:
        return state;

    }
     
    return state;
}

export default authReducer;