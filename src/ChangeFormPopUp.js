// 使用者填表單組件
import React from 'react'
import ReactDOM from "react-dom"
import Popup from 'reactjs-popup'
import { connect } from 'react-redux'
// import { firestoreConnect } from 'react-redux-firebase'
// import { compose } from 'redux' 
import { storage } from './config/firebaseConfig'
import { Link, Redirect } from 'react-router-dom';

// import action
import { changeFormAction } from './store/actions/ChangeFormAction'
import { createEXChangeFormData } from './store/actions/SubmitFormAction'



// import image
import form_Illustration from './img/eastwood-page-under-construction.png'
// css
import '../src/ChangeFormPopUp.css';

// 可以const兩種不同的state 這樣抓到的資料就會不一樣
class ChangeFormPopUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // 演唱會名稱與地點
      ConcertName: '',
      ConcertPlace: '',
      // 選到的演唱會ID
      queryConcertID: '',
      // 持有的選取區域
      selectName: '',
      selectPrice: '',
      // 交換的選取區域
      exChangeSelectArea: '',
      exChangeSelectPrice: '',
      // 張數
      ticketNum: '',
      // 交換方式
      changeWay: '',
      // 電話
      phoneNumber: '',
      // 備註文字
      reminderTxt: '',
      // 檔案上傳
      // 價差
      priceSpread: '',
      pricePlusTag: '',
      // 圖片的網址
      url: '',
      // 這邊要再傳一個參數
      user_name: '',
      user_id: this.props.auth.uid,
      email: this.props.auth.email,
      // 表單初始的交換狀態state
      // 0  初始 1 無回應 2 接受 3 拒絕 
      initialChangeState: 0,
      // 其他功能的state
      open: false,
      isChecked: false
    };
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  componentDidMount(formdata, concerDataAll) {
    this.props.changeFormAction(formdata, concerDataAll);
    // 當我要在function裡面叫action的時候
    // 這個是抓資料
  }

  openModal() {
    this.setState({ open: true })
  }

  closeModal() {
    this.setState({ open: false })
  }


  // 演唱會function
  changeConcertName(e) {
    this.setState({ ConcertName: e.target.value });
    this.props.concerDataAll.map((item, index) => {
      if (e.target.value === item.name) {
        this.setState({ ConcertPlace: item.place });
        this.setState({ queryConcertID: item.concert_id });
      }
      return false;
      // true
    });
  }

  changeConcertPlace(e) {
    this.setState({ ConcertPlace: e.target.value });
  }

  // 持有票券區域function
  changeName(e) {
    this.setState({ selectName: e.target.value });
    this.props.formdata.map((item, index) => {
      if (e.target.value === item.name) {
        // console.log(item.name,item.price[0])
        this.setState({ selectPrice: item.price[0] });
        // 非同步
        // console.log(item.concert_id,this.state.open)
      }
      return false;
      // true
    });
  }

  changePrice(e) {
    this.setState({ selectPrice: e.target.value },
      function () {
        let selectPrice_hold = Number((this.state.selectPrice).replace(/\D/g, ""));
        let selectPrice_change = Number((this.state.exChangeSelectPrice).replace(/\D/g, ""));
        // this.setState({priceSpread: selectPrice_hold-selectPrice_change})
        if (selectPrice_hold > selectPrice_change) {
          this.setState({
            priceSpread: selectPrice_hold - selectPrice_change,
            pricePlusTag: '對方需要補給您NT$'
          })
        } else if (selectPrice_hold < selectPrice_change) {
          this.setState({
            priceSpread: selectPrice_change - selectPrice_hold,
            pricePlusTag: '您需要補給對方NT$'
          })
        } else {
          this.setState({ priceSpread: '您不需要補差額' })
        }
      }

    );
  }

  // 欲交換票券的區域function
  exChangeArea(e) {
    this.setState({ exChangeSelectArea: e.target.value });
    this.props.formdata.map((item, index) => {
      // console.log(item.name,index)
      if (e.target.value === item.name) {
        this.setState({ exChangeSelectPrice: item.price[0] });
      }
      return false;
      // true
    });
  }

  exChangePrice(e) {
    this.setState({ exChangeSelectPrice: e.target.value },
      function () {
        alert('Hello')
        let selectPrice_hold = Number((this.state.selectPrice).replace(/\D/g, ""));
        let selectPrice_change = Number((this.state.exChangeSelectPrice).replace(/\D/g, ""));
        // this.setState({priceSpread: selectPrice_hold-selectPrice_change})
        if (selectPrice_hold > selectPrice_change) {
          this.setState({
            priceSpread: selectPrice_hold - selectPrice_change,
            pricePlusTag: '對方需要補給您NT$'
          })
        } else if (selectPrice_hold < selectPrice_change) {
          this.setState({
            priceSpread: selectPrice_change - selectPrice_hold,
            pricePlusTag: '您需要補給對方NT$'
          })
        } else {
          this.setState({ priceSpread: '您不需要補差額' })
        }
      }
    )
  }

  // 其他附加資訊的onChange function
  handleChangeValue(e) {
    this.setState({
      [e.target.id]: e.target.value,
      // 交換者的電話
      phoneNumber: this.props.profile.phone_number,
      user_name: this.props.profile.user_name
    })
  }


  // 提交表單
  handleSubmit(e) {
    e.preventDefault();
    // create提交表單資料的action
    alert("表單已送出，感謝您的填寫！");
    this.props.createEXChangeFormData(this.state);
  }

  // checkbox
  toggleChange = () => {
    this.setState({
      isChecked: !this.state.isChecked,
    });
  }

  // imageUploader
  handleImageUpload = (e) => {
    e.preventDefault();
    if (e.target.files[0]) {
      const image = e.target.files[0];
      const uploadTask = storage.ref(`formUploadImages/${image.name}`).put(image);
      uploadTask.on('state_changed',
        (snapshot) => {
          // console.log(snapshot);
        },
        (error) => {
          // console.log(error);
          alert('上傳的圖檔請小於2MB，謝謝！')
        },
        () => {
          storage.ref('formUploadImages').child(image.name).getDownloadURL().then(url => {
            this.setState({ url });
            // console.log(url);
            alert("圖片已上傳完畢！")
          })
        }
      )
    }
  }

  render() {
    const popUpStyle = {
      padding: 0,
      border: 'none',
      background: 'rgba(0,0,0,0)',
      boxShadow: 'none',
      fontSize: '20px'
    }

    let concertAllBasicInfo_name = [];
    let concertAllBasicInfo_place = [];

    const concertDataBasic = this.props.concerDataAll;
    // console.log(concertDataBasic.length)
    // 這邊嘗試加上if條件句 看firebase的數據
    if (concertDataBasic && concertDataBasic.length !== 0) {
      for (let i = 0; i < concertDataBasic.length; i++) {
        // console.log(concertDataBasic[i].concert_id,concertDataBasic[i].name,concertDataBasic[i].place);
        concertAllBasicInfo_name.push(concertDataBasic[i].name);
        concertAllBasicInfo_place.push(concertDataBasic[i].place);
      }
    }

    // console.log(concertAllBasicInfo_name);
    const concertName = concertAllBasicInfo_name.map((item, index) => {
      return <option key={index} value={item} index={index}>{item}</option>;
    });


    const concertPlace = concertAllBasicInfo_place.map((item, index) => {
      // console.log(item,index);
      // console.log(concertAllBasicInfo_name.indexOf(this.state.ConcertName.toString()));
      if (concertAllBasicInfo_name.indexOf(this.state.ConcertName.toString()) === index) {
        return <option key={index}>{item}</option>
      }
      return false;
      // true
    });

    // 區域與票價名稱
    let dataAll = [];
    let pricedataAll = []
    const concertData = this.props.formdata;

    if (concertData && concertData.length !== 0) {
      for (let i = 0; i < concertData.length; i++) {
        // console.log(concertData[i].concert_id,concertData[i].name);
        if (concertData[i].concert_id === this.state.queryConcertID) {
          dataAll.push(concertData[i].name);
          pricedataAll.push(concertData[i].price);
        }
      }
    }


    const names = dataAll.map((item, index) => {
      return <option key={index} value={item} index={index}>{item}</option>;
    });

    // console.log(pricedataAll);
    // console.log(dataAll,name);
    // console.log(this.state.selectName);
    // 選到的票區的index
    // console.log(dataAll.indexOf(this.state.selectName.toString()))
    const prices = pricedataAll.map((item, index) => {
      // console.log(item,index)
      if (dataAll.indexOf(this.state.selectName.toString()) === index) {
        return item.map((item, index) => (
          <option key={index}>{item}</option>
        ));
      }
      // true
      return false;
    });

    // 選到的票價（持有）
    // console.log(this.state.selectPrice)

    // 欲交換區域
    const exChangeAreas = dataAll.map((item, index) => {
      return <option key={index} value={item} index={index}>{item}</option>;
    });

    const exChangePrices = pricedataAll.map((item, index) => {
      if (dataAll.indexOf(this.state.exChangeSelectArea.toString()) === index) {
        return item.map((item, index) => (
          <option key={index}>{item}</option>
        ));
      }
      // true
      return false;
    });

    console.log(this.props.profile.user_name)
    return (
      <div>
        <div className="change_btn" onClick={() => this.openModal()}>我要交換 <i className="fas fa-chevron-right"></i></div>
        <Popup
          open={this.state.open}
          closeOnDocumentClick
          onClose={() => this.closeModal()}
          contentStyle={popUpStyle}>
          <div className="change_form_all">
            <p className="form_title" >TICKET EX-CHANGE FORM</p>
            <div className="change_form">
              {/* <div className="form_img"><img src={form_Illustration}/></div> */}
              <form onSubmit={this.handleSubmit.bind(this)}>
                <p>{this.props.name}</p>
                <div className="data_block">
                  <label htmlFor="inputform_concertName">演唱會名稱　</label>
                  <select value={this.state.ConcertName} onChange={this.changeConcertName.bind(this)}>
                    <option value="">請選擇</option>
                    {concertName}
                  </select>
                </div>
                <div className="place_and_change">
                  <div className="hold_place_block">
                    <label htmlFor="hold_area">舉行地點　</label>
                    <select value={this.state.ConcertPlace} onChange={this.changeConcertPlace.bind(this)}>
                      <option value="">請選擇</option>
                      {concertPlace}
                    </select>
                  </div>
                  <div className="change_way_block">
                    <label htmlFor="change_way">交換方式　</label>
                    <select value={this.state.changeWay} id="changeWay" onChange={this.handleChangeValue.bind(this)} required>
                      <option value="">請選擇</option>
                      <option value="send_package">郵寄</option>
                      <option value="face_to_face">面交</option>
                      <option value="others_way">其他</option>
                    </select>
                  </div>
                </div>
                <div className="data_block">
                  <label htmlFor="hold_ticket_area">持有區域 & 票價　</label>
                  <select value={this.state.selectName} onChange={this.changeName.bind(this)} required>
                    <option value="">請選擇</option>
                    {names}
                  </select>
                  <select value={this.state.selectPrice} onChange={this.changePrice.bind(this)} required>
                    <option value="">請選擇</option>
                    {prices}
                  </select>
                </div>
                <div className="data_block">
                  <label htmlFor="change_area">交換區域 & 票價　</label>
                  <select value={this.state.exChangeSelectArea} onChange={this.exChangeArea.bind(this)} required>
                    <option value="">請選擇</option>
                    {exChangeAreas}
                  </select>
                  <select value={this.state.exChangeSelectPrice} onChange={this.exChangePrice.bind(this)} required>
                    <option value="">請選擇</option>
                    {exChangePrices}
                  </select>
                </div>
                <div className="data_block">
                  <label htmlFor="price_spread">票券價差　<span className="spread_total">
                    {this.state.pricePlusTag + this.state.priceSpread}</span></label>
                </div>
                <div className="data_block" onChange={this.handleChangeValue.bind(this)}>
                  <p>聯絡資訊｜</p>
                  <p>{this.props.profile.user_name} {this.props.profile.phone_number}</p>
                  <p>{this.state.email}</p>
                </div>
                <div className="data_block">
                  <label htmlFor="ps_text">備註　</label>
                  <textarea value={this.state.reminderTxt} id="reminderTxt" onChange={this.handleChangeValue.bind(this)} required></textarea>
                </div>
                <label>
                  <input type="file" url={this.state.url} id="filepath" onChange={this.handleImageUpload.bind(this)} />
                  <p>上傳的圖檔請小於2MB，謝謝！</p>
                </label>
                <p>
                  <input type="checkbox" className="checkbox_style" checked={this.state.isChecked} onChange={this.toggleChange} required />
                  請再次確認填寫資訊，確認無誤後再送出。
                      </p>
                <button className="ChangeFormSubmit">確認送出</button>
              </form>
            </div>
          </div>
        </Popup>
      </div>
    );
  }
}





const mapStateToProps = (state) => {
  return {
    formdata: state.form.formdata,
    concerDataAll: state.form.concerDataAll,
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    renderMatchListDataID: state.form.renderMatchListDataID,
    renderMatchListData: state.form.renderMatchListData

    // 這個要透過父層傳到子層
  }
}


function mapDispatchToProps(dispatch) {
  return ({
    changeFormAction: () => dispatch(changeFormAction()),
    createEXChangeFormData: (changeFormData) => dispatch(createEXChangeFormData(changeFormData))
  })
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(ChangeFormPopUp);


