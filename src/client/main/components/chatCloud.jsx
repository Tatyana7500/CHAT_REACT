import React, { Component } from 'react';

class ChatCloud extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className='massage'>
                <p className='massage__name'> </p>
                <p className='massage__email'> </p>
                <span className='massage__text'>{this.props.text}</span>
                <p className='massage__time'> </p>
            </div>
        );
    }
}

export default ChatCloud;