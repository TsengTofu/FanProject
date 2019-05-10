import React from 'react';
// 父層 LoginAndSignUpPopup >> 父層 TabsAll >> TabForSignUpAndLogin
// 組件
import TabForSignUpAndLogin from './TabForSignUpAndLogin'



const TabsAll = ({ activeTabIndex, handleClickTab,tabIndex }) => {
    const isActive = activeTabIndex === tabIndex;
    return(
    <div className="switch_button">
        <TabForSignUpAndLogin
            tabIndex="0" label="登入"
            isActive={isActive}
            handleClickTab={handleClickTab} />
        <TabForSignUpAndLogin
            tabIndex="1" label="註冊"
            isActive={isActive}
            handleClickTab={handleClickTab} />
    </div>)
}







// class TabsAll extends React.Component {
//   constructor(props) {
//     super(props);
//   }

//   render() {
//     return (
//         <div>
//             <TabForSignUpAndLogin/>
//         </div>         
//     );
//   }
// };

export default TabsAll;