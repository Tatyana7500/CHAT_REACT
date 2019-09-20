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
       
       
       
        this.state = {
          
            showEmojis: false,
        };
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
                    <textarea id='textMassage' className='textMassage' placeholder='Your massage' value={this.props.messageAreaValue} onChange= {this.props.updateMessageValue}> </textarea>
                    <button onClick={this.props.clickButtonSend} className='btn btn-main footer__send'>Send</button>
{/* 
                    {/* {this.state.showEmojis ? (
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
                    )} */} 
                </div>
            </div>
        );
    }
}

export default ChatWindow;