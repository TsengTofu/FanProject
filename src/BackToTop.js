// Back to top button
import React from 'react'
// css
import './BackToTop.css'

class BackToTopButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            intervalId: 0,
            nowPositionY: false
        }
    }

    // 處理render top按鈕的觸發條件
    componentDidMount() {
        document.addEventListener('scroll', () => {
            if (window.pageYOffset > 800) {
                this.setState({ nowPositionY: true })
            } else {
                this.setState({ nowPositionY: false })
            }
        })
    }

    scrollStep() {
        // window.pageYOffset === scrollY意思一樣
        if (window.pageYOffset === 0) {
            clearInterval(this.state.intervalId);
        }
        window.scroll(0, window.pageYOffset - this.props.scrollStepInPx);
    }
    // 幾秒回到最上面 
    scrollToTop() {
        let intervalId = setInterval(this.scrollStep.bind(this), this.props.delayInMs);
        this.setState({ intervalId: intervalId });
    }



    render() {
        if(this.state.nowPositionY){
            return (
                <button className="back_to_top_button" onClick={() => {
                    this.scrollToTop();
                }}>
                    <i className="fas fa-chevron-up"></i>
                    <p>TOP</p>
                </button>
            );
        }else{
            return null;
        }
        
    }
}


export default BackToTopButton;
