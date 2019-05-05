// firebase cloud function 的index.js
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase)


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

// firestore function這樣寫（DEMO）↓
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// 小的function可以直接寫在這裡
const createNotification = (notification) =>{
    // 這邊的notification是下面剛剛宣告的物件
    return admin.firestore().collection('notification').add(notification).then((doc)=>{
        console.log('notification added',doc);
    })
}


// 上面這些code是只會在firebase server執行
// 不會在browser執行
// deploy 是會直接在firebase裡面建立一個function 也會包含trigger的方式
// in terminal(npm)  >>> firebase deploy --only functions 有點類似把function發布到firebase
// hoist是最後可以讓網站直接在firebase執行

// 當function被觸發的時候 可以從firebase console看log是否被執行
// document('projects/{projectId}')  projects是集合
// 當集合裡面有文件被新增的時候就要有反應 
exports.whenExChangeDataCreate = functions.firestore.document('exchange_form/{}').onCreate(
    doc=>{
        const exchangeformAlone = doc.data();
        // 想要顯示的通知內容 是一個object 想要以document的方式存到通知的collection
        const notification = {
            content:'有票通知',
            user:`${exchangeformAlone.user_id}`
        }
        return createNotification(notification);
})

// 寫完要加上firebase deploy --only functions 
// push到上面