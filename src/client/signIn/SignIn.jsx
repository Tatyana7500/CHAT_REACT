import React, { Component } from 'react';

export default class SignIn extends Component {
    render() {
        return (
            <div className='login-wrapper'>

                <div className='buttons'>
                    <a href='http://localhost:3000/login' className='btn buttons__btn' id='singin_loginBtn'>login</a>
                    <a href='http://localhost:3000/signIn' className='btn buttons__btn buttons__btn  buttons__btn_active' id='singin_singInBtn'>sing in</a>
                </div>

                <div className='login-form'>

                    <label htmlFor ='singinPageEmailInput' className='login-form__label' name='Email'>Your e-mail</label>
                    <input type='text' className='login-form__input' maxLength='16' placeholder='E-mail' id='singinPageEmailInput' />

                    <label htmlFor='singinPageNameInput' className='login-form__label' name='name'>Your name</label>
                    <input type='text' className='login-form__input' maxLength='16' placeholder='Name' id='singinPageNameInput' />

                    <label htmlFor='singinPagePasswordInput' className='login-form__label' name='password'>Your Password</label>
                    <input type='password' className='login-form__input' maxLength='16' placeholder='Password' id='singinPagePasswordInput' />

                    <label htmlFor='singinPageComfirmPasswordInput' className='login-form__label' name='password'>Comfirm your Password</label>
                    <input type='password' className='login-form__input' maxLength='16' placeholder='ComfirmPassword' id='singinPageComfirmPasswordInput' />

                    <input type='submit' value='sing in' className='btn login-form__btn' id='regAccount' />

                </div>

            </div>
        );
    }
}