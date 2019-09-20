import React, { Component } from 'react';
import ChatCloud from './chatCloud';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import '../../login/style.css';
import util from "../../../server/util";
import constants from "../../../server/constants";

class ChatWindow extends Component {
    constructor(props) {
        super(props);
        this.updateMessageValue = this.updateMessageValue.bind(this);
        this.clickButtonSend = this.clickButtonSend.bind(this);
        this.messageInputRef = React.createRef();
        this.state = {
            messageAreaValue: '',
            showEmojis: false,
        };
    }

    updateMessageValue(e) {
        this.setState({ messageAreaValue: e.target.value });
    }

    showEmojis = (e) => {
        this.setState(
            {
                showEmojis: true,
            },
            () => document.addEventListener("click", this.closeMenu)
        );
    };

    closeMenu = (e) => {
        if (this.emojiPicker !== null && !this.emojiPicker.contains(e.target)) {
            this.setState(
                {
                    showEmojis: false,
                },
                () => document.removeEventListener("click", this.closeMenu)
            );
        }
    };

    addEmoji = (e) => {
        console.log(e);
        let emoji = e.native;
        this.setState({
            messageAreaValue: this.state.messageAreaValue + emoji,
        });
    };

    clickButtonSend = async () => {
        await this.setState({
            sender: '1',
            receiver: 'ALL',
            message: this.messageInputRef.current.value,
            date: new Date().getTime(),
        });
        const data = await util.sendPostRequest(`${constants.LOCALHOST}/message`, this.state);
        this.setState({
            messageAreaValue: '',
        });
    };


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
                    <textarea ref={this.messageInputRef} name='' id='textMassage' className='textMassage' placeholder='Your massage' value={this.state.messageAreaValue} onChange={this.updateMessageValue}> </textarea>
                    <button onClick={this.clickButtonSend} className='btn btn-main footer__send'>Send</button>

                    {this.state.showEmojis ? (
                        <span className = 'emojiPicker' ref={el => (this.emojiPicker = el)}>
                            <Picker
                                onSelect={this.addEmoji}
                                emojiTooltip={true}
                                title='weChat'
                            />
                          </span>
                            ) : (
                        <p className = 'getEmojiButton' onClick={this.showEmojis}>
                            {String.fromCodePoint(0x1f60a)}
                        </p>
                    )}
                </div>
            </div>
        );
    }
}

export default ChatWindow;