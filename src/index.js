import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter } from "react-router-dom";
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
//reducers集線器
import rootReducer from '../src/store/reducers/rootReducer'
// this is the binding layer 可以幫助我們綁定redux
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { reduxFirestore, getFirestore } from 'redux-firestore'
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase'
import firebase from './config/firebaseConfig'
// 這邊的firebase可以理解成綁定的firebase project


import logger from 'redux-logger';



// 組件
import App from './App';

// 這是import react thunk 這邊還可以放其他的middleware
const store = createStore(rootReducer,
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument({getFirebase,getFirestore})),
        applyMiddleware(logger),
        reduxFirestore(firebase),
        reactReduxFirebase(firebase,
            {useFirestoreForProfile:true,
                userProfile:'users',
                attachAuthIsReady:true}
            )
        // 後面這個是要去偵測登入的狀態
    ));




// inside the function need to put a route reducer.
// 還是可以有不同的reducer

// withExtraArgument 他可以讓我們在action
// return (dispatch, getState, 'another parameter must be an object')  這段code裡面多一個參數

// 用這行包住的話 就是會等到狀態 ready 才開始 render 

store.firebaseAuthIsReady.then(() => { // state is ready here
    ReactDOM.render(<Provider store={store}><HashRouter><App /></HashRouter></Provider>, document.getElementById("root"));
})