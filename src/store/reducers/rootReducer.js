// 這個通常是最後要合併所有reducer的檔案
import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore'
import { firebaseReducer } from 'react-redux-firebase'
import authReducer from './authReducer'
import formReducer from './formReducer'
import upComingEventReducer from './upComingEventReducer'
import memberReducer from './memberReducer'
import ticketChangeReducer from './ticketChangeReducer'


const rootReducer = combineReducers({
// inside combineReducers() is an object
// 這裡面放想要合併的reducer 可以接其他的
    auth:authReducer,
    form:formReducer,
    upComingEvent:upComingEventReducer,
    // 會員相關的
    memberDataBase:memberReducer,
    // 交換相關的
    ticketChange:ticketChangeReducer,
    firestore:firestoreReducer,
    firebase:firebaseReducer
});

export default rootReducer;



// redux 就很像state的倉庫
// store是老闆  reducer是生產線員工
// provider是仲介商（只出現一次的仲介商）
// component是客戶
// state就是 產品