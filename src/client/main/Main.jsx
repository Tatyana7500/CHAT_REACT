import React, { Component } from 'react';
import MainHeader from './components/mainHeader';
import ContentWindow from './components/contentWindow';
import constants from '../../server/constants';
import util from '../../server/util.jsx'
import openSocket from 'socket.io-client';


class Main extends Component {
    constructor(props) {
        super(props);
        this.getItemFromLocalStorage = this.getItemFromLocalStorage.bind(this);
       // this.clickButtonUser = this.clickButtonUser.bind(this)
        //this.clickButtonChat = this.clickButtonChat.bind(this)
        this.messageRef = React.createRef();
        const socket = openSocket('http://localhost:8080');
        this.state = {
            name: '',
            email: '',
            mainWindowState: constants.USERS, //TODO: обьеденить в 1 поле
            usersList: [],
            messagesList: [],
            idUserSender: null,
            idUserReceiver: constants.ALL,
            chat: constants.PUBLIC,
            messageAreaValue: '',
            messageBody: {
                name: '',
                receiver: '',
                message: '',
                date: '',
            }
        };
    }

    clickButtonUser = async () => {
        await this.setState({
            mainWindowState: constants.USERS,
        });
        const response = await util.sendGetRequest(`${constants.LOCALHOST}/users`);
       await this.setState({
            usersList: response,
        });
    }

    clickButtonChat = async () => {
        this.setState({
           mainWindowState: constants.MESSAGE,
        })
       const data = await util.sendGetRequest(`http://localhost:8080/messages?chat=${this.state.chat}&sender=${this.state.idUserSender}&receiver=${this.state.idUserReceiver}`)
            await this.setState({
                messagesList: data,
            });
        
    }

    updateMessageValue = (e) => {
        this.setState({ messageAreaValue: e.target.value });
        //this.socket.on(constants.MESSAGE , console.log("d"))
    }

    clickButtonSend = async () => {
       const message= await this.setState({
           messageBody: { 
            sender: this.state.idUserSender,
            receiver: constants.ALL,
            message: this.state.messageAreaValue,
            date: new Date().getTime(),
           },
        });
         await util.sendPostRequest(`${constants.LOCALHOST}/message`, this.state.messageBody );
        await console.log(this.state.messageBody)
        await this.setState({
            messageAreaValue: '',
            messagesList: [...this.state.messagesList, this.state.messageBody]
        });
    };

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
                    messageRef={this.messageRef}
                    clickChat={this.clickButtonChat}
                    clickUsers={this.clickButtonUser}
                    clickButtonSend = {this.clickButtonSend}
                    messageAreaValue={this.messageAreaValue}
                    updateMessageValue = {this.updateMessageValue}
                />
            </div>
        );
    }
}

export default Main;