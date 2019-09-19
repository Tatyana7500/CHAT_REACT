import React, { Component } from 'react';
import MainHeader from './components/mainHeader';
import ContentWindow from './components/contentWindow';

class Main extends Component {
    render() {
        return (
           <div className='main'>
                <MainHeader />
                <ContentWindow />
           </div>
        );
    }
}

export default Main;