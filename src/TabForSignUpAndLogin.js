// TabForSignUpAndLogin 這個為了登入註冊的切換 tab 按鈕
import React from 'react';

// 父層 LoginAndSignUpPopup >> 父層 TabsAll >> TabForSignUpAndLogin

class TabForSignUpAndLogin extends React.Component {
  constructor(props) {
    super(props);
    this.onTabClick = this.onTabClick.bind(this);
  }

  onTabClick(){
      this.props.handleClickTab(this.props.tabIndex);
  }
  

  render() {
    const { isActive,label } = this.props;
    return (
        <button className="tab_template" onClick={this.onTabClick}>
            {label}
        </button>         
    );
  }
};

export default TabForSignUpAndLogin;