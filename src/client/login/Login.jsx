import React, { Component } from 'react';
import './style.css';

export default class Login extends Component {
    constructor(props) {
        super(props);
        
        this.submitLoginForm = this.submitLoginForm.bind(this);
        this.emailInputRef = React.createRef();
        this.passwordInputRef = React.createRef();
        this.sendPostRequest = this.sendPostRequest.bind(this);
        this.state = {
            emailInput: '',
            passwordInput: '',
        };
    }
   
    render() {
        return (
            <div className='login-wrapper'>
                <div className='buttons'>
                    <a href='http://localhost:3000/login' className='btn buttons__btn buttons__btn_active' id='loginBtn'>login</a>
                    <a href='http://localhost:3000/signIn' className='btn buttons__btn buttons__btn' id='singInBtn'>sing in</a>
                </div>
                <div className='login-form'>
                    <label htmlFor='loginPageEmailInput' className='login-form__label' name='Email'>Your e-mail</label>
                    <input type='text' className='login-form__input' maxLength='16' placeholder='E-mail' id='loginPageEmailInput' ref={this.emailInputRef} required />
                    <label htmlFor='loginPagePasswordInput' className='login-form__label' name='password'>Your Password</label>
                    <input type='password' className='login-form__input' maxLength='16' placeholder='Password' id='loginPagePasswordInput' ref={this.passwordInputRef} required />
                    <input type='submit' value='login' className='btn login-form__btn' onClick={this.submitLoginForm} id='enterAccount' />
                </div>
            </div>
        );
    }
}