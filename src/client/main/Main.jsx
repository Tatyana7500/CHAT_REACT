import React, { Component } from 'react';
import MainHeader from './components/mainHeader';
import ContentWindow from './components/contentWindow';
import constants from '../../server/constants';
import util from '../../server/util.jsx'

class Main extends Component {
    constructor(props) {
        super(props);
        this.getItemFromLocalStorage = this.getItemFromLocalStorage.bind(this);
        this.clickButtonUser = this.clickButtonUser.bind(this)
        this.clickButtonChat = this.clickButtonChat.bind(this)
       //TODO: без bind
        this.state = {
            name: '',
            email: '',
            mainWindowState: constants.USERS, //TODO: обьеденить в 1 поле
            usersList: [],
            messagesList: [],
            idUserSender: null,
            idUserReceiver: constants.ALL,
            chat: constants.PUBLIC,
        };
    }

   async clickButtonUser () {
        await this.setState({
            mainWindowState: constants.USERS,
        });
        const response = await util.sendGetRequest(`${constants.LOCALHOST}/users`);
       await this.setState({
            usersList: response,
        });
    }

    async clickButtonChat() {
        this.setState({
           mainWindowState: constants.MESSAGE,
        })
       const data = await util.sendGetRequest(`http://localhost:8080/messages?chat=${this.state.chat}&sender=${this.state.idUserSender}&receiver=${this.state.idUserReceiver}`)
            await this.setState({
                messagesList: data,
            });
        
    }

    getItemFromLocalStorage() {
        const userObj = localStorage.getItem('chat');
        this.setState({
            name: JSON.parse(userObj).name,
            email: JSON.parse(userObj).email,
            idUserSender: JSON.parse(userObj)._id,
        });
    }
    
    componentDidMount() {
        this.getItemFromLocalStorage();
    }

    render() {
        return (
            <div className='main'>
                <MainHeader
                    name={this.state.name}
                    email={this.state.email}
                />
                <ContentWindow
                    chat={this.state.clickChat}
                    List={this.state.usersList}
                    users={this.state.mainWindowState}
                    messages={this.state.messagesList}
                    clickChat={this.clickButtonChat}
                    clickUsers={this.clickButtonUser}
                />
            </div>
        );
    }
}

export default Main;