import React, { Component } from 'react';
import UsersList from './usersList';
import ChatWindow from './chatWindow';
import constants from '../../../server/constants';

class ContentWindow extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            
            <div className='mainWindow'>
                <div className='wrapper mainWindow__wrapper'>
                    <div className='buttons-main'>
                        <button onClick={this.props.clickUsers} className='btn buttons-main__btn buttons-main__btn_user' id='getUsers'>users</button>
                        <button onClick={this.props.clickChat} className='btn buttons-main__btn buttons-main__btn_chat' id='getChat'>chat</button>
                    </div>
                </div>
                
                {this.props.users === constants.USERS && <UsersList usersList={this.props.List} />}
                {this.props.users === constants.MESSAGE && <ChatWindow  messages = {this.props.messages}/>}
            </div>
        );
    }
}

export default ContentWindow;