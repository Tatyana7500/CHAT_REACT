import React, { Component } from 'react';
import MainHeader from './mainHeader';
import ContentWindow from './contentWindow';

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