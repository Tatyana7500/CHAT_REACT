import React, { Component } from 'react';
import MainHeader from './components/mainHeader';
import ContentWindow from './components/contentWindow';
import { callbackify } from 'util';

class Main extends Component {
    constructor(props) {
        super(props);
        this.getItemFromLocalStorage = this.getItemFromLocalStorage.bind(this);
        this.clickButtonUser = this.clickButtonUser.bind(this);
        this.clickButtonChat = this.clickButtonChat.bind(this);
        this.sendGetRequest = this.sendGetRequest.bind(this);
        this.state = {
            name: '',
            email: '',
            clickChat: false,
            clickUser: false,
            usersList: [],
            messagesList: [],
            idUserSender: null,
            idUserReceiver: 'ALL',
            chat: 'PUBLIC',       //TODO: ALL and PUBLIC write CONSTANTS
        };
    }

    clickButtonUser() {
        this.setState({
            clickUser: true,
            clickChat: false,
        }, () => this.sendGetRequest('http://localhost:8080/users', (data) => {
            this.setState({
                usersList: data,
            });
        }));
    }

    clickButtonChat() {
        this.setState({
            clickUser: false,
            clickChat: true,
        }, () => this.sendGetRequest(`http://localhost:8080/messages?chat=${this.state.chat}&sender=${this.state.idUserSender}&receiver=${this.state.idUserReceiver}`, (data) =>{
            this.setState({
                messagesList: data,
            });
        }));
    }

    getItemFromLocalStorage() {
        const userObj = localStorage.getItem('chat');
        this.setState({
            name: JSON.parse(userObj).name,
            email: JSON.parse(userObj).email,
            idUserSender: JSON.parse(userObj)._id,
        });
    }

     async sendGetRequest(url, callback) {
        const data = await fetch(url)
            .then((res) => res.json());
        if (data) {
            callback(data);
        }
    }

    componentDidMount() {
        this.getItemFromLocalStorage();
    }

    render() {
        return (
            <div className='main'>
                <MainHeader name={this.state.name} email={this.state.email} />
                <ContentWindow clickChat={this.clickButtonChat} clickUsers={this.clickButtonUser} chat={this.state.clickChat} users={this.state.clickUser} List={this.state.usersList} mesList={this.state.messagesList} />
            </div>
        );
    }
}

export default Main;