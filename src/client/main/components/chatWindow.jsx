import React, { Component } from 'react';
import ChatCloud from './chatCloud';

class ChatWindow extends Component {
    constructor(props) {
        super(props);
        this.updateMessageValue = this.updateMessageValue.bind(this);
        this.clickButtonSend = this.clickButtonSend.bind(this);
        this.state = {
            messageAreaValue: '',
            sendMessage: [],
        };
    }

    updateMessageValue(e) {
        this.setState({ messageAreaValue: e.target.value });
    }

    clickButtonSend() {
        this.setState({
            sendMessage: [...this.state.sendMessage, this.state.messageAreaValue],
            messageAreaValue: '',
        });
    }

    render() {
        return (
            <div className='content'>
                <div className='massageField' id='massageField'>
                     {this.props.messages.map((item, index) => {
                        return (
                            <ChatCloud key={index} name={item.name} text={item.message} email = {item.email}/>
                        );
                    })
                    } 
                </div>
                <div className='footer'>
                    <textarea name='' id='textMassage' className='textMassage' placeholder='Your massage' value={this.state.messageAreaValue} onChange={this.updateMessageValue}> </textarea>
                    <button onClick={this.clickButtonSend} className='btn btn-main footer__send'>Send</button>
                </div>
            </div>
        );
    }
}

export default ChatWindow;