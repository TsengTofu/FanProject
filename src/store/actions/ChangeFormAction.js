// 連動選單的資料
import { connect } from "redux";

export const changeFormAction = (formdata, concerDataAll) => {
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
        firestore.collection('sharchingtung').get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    let datasharchingtung = doc.data();
                    dataArray.push(datasharchingtung)
                })
            })

        // 5566
        firestore.collection('5566-taipeiArena').get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    let fivefivesixsix = doc.data();
                    dataArray.push(fivefivesixsix)
                })
            })

        // aimer
        firestore.collection('aimer').get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    let aimerdata = doc.data();
                    dataArray.push(aimerdata)
                })
            })

        // blackpink
        firestore.collection('blackpink-ntsuArena').get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    let bpdata = doc.data();
                    dataArray.push(bpdata)
                })
            })

        // gem-karena
        firestore.collection('gem-karena').get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    let gemdata = doc.data();
                    dataArray.push(gemdata)
                })
            })

        // jasonmraz
        firestore.collection('jasonmraz').get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    let jasonmrazdata = doc.data();
                    dataArray.push(jasonmrazdata)
                })
            })


        // lionking
        firestore.collection('lionking').get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    let lionkingdata = doc.data();
                    dataArray.push(lionkingdata)
                })
            })


        // lucrowd
        firestore.collection('lucrowd').get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    let lucrowddata = doc.data();
                    dataArray.push(lucrowddata)
                })
            })

        // maroon5-karena
        firestore.collection('maroon5-karena').get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    let maroon5data = doc.data();
                    dataArray.push(maroon5data)
                })
            })


        // oldboy
        firestore.collection('oldboy').get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    let oldboydata = doc.data();
                    dataArray.push(oldboydata)
                })
            })


        // parkbogum
        firestore.collection('parkbogum').get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    let parkbogumdata = doc.data();
                    dataArray.push(parkbogumdata)
                })
            })


        // roybigyo
        firestore.collection('roybigyo').get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    let roybigyodata = doc.data();
                    dataArray.push(roybigyodata)
                })
            })

        // shargchain_tower
        firestore.collection('shargchain_tower').get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    let shargchaindata = doc.data();
                    dataArray.push(shargchaindata)
                })
            })

        // shuruyun
        firestore.collection('shuruyun').get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    let shuruyundata = doc.data();
                    dataArray.push(shuruyundata)
                })
            })


        // sunmi
        firestore.collection('sunmi').get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    let sunmidata = doc.data();
                    dataArray.push(sunmidata)
                })
            })


        // troyesivan
        firestore.collection('troyesivan').get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    let troyesivandata = doc.data();
                    dataArray.push(troyesivandata)
                })
            })



        // chencheer
        firestore.collection('chencheer').get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    let datachencheer = doc.data();
                    dataArray.push(datachencheer)
                })
            }).then(() => {
                console.log(dataArray)
                dispatch({ type: 'CREATE_OPTION', dataArray, concertArray })
            }).catch((err) => {
                // dispatch({type:'CREATE_PROJECT_ERROR',err})
            })
    }
}

