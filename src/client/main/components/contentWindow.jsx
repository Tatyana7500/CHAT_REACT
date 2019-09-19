import React, { Component } from 'react';
import UsersList from './usersList';
import ChatWindow from './chatWindow';

class ContentWindow extends Component {
    constructor(props) {
        super(props);
        this.clickButtonUser = this.clickButtonUser.bind(this);
        this.clickButtonChat = this.clickButtonChat.bind(this);
        this.state = {
            clickUser: false,
            clickChat: false,
        };
    }

    clickButtonUser() {
        this.setState({
            clickUser: true,
            clickChat: false,
        });
    }
    clickButtonChat() {
        this.setState({
            clickUser: false,
            clickChat: true,
        });
    }

    render() {
        return (
            <div className='mainWindow'>
                <div className='wrapper mainWindow__wrapper'>
                    <div className='buttons-main'>
                        <button onClick={this.clickButtonUser} className='btn buttons-main__btn buttons-main__btn_user' id='getUsers'>users</button>
                        <button onClick={this.clickButtonChat} className='btn buttons-main__btn buttons-main__btn_chat' id='getChat'>chat</button>
                    </div>
                </div>
                {this.state.clickUser && <UsersList />}
                {this.state.clickChat && <ChatWindow />}
            </div>
        );
    }
}

export default ContentWindow;