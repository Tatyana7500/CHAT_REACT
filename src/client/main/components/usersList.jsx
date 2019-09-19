import React, { Component } from 'react';

class UsersList extends Component {
    render() {
        return (
            <div className='content'>
                <div className='users__title'>
                    <div className='users__info'>name</div>
                    <div className='users__info'>e-mail</div>
                </div>
                <div className='users__card'>
                    <p className='users__info'>Nikita</p>
                    <p className='users__info'>Nikita@gmail.com</p>
                </div>
                <div className='users__card'>
                    <p className='users__info'>Nikita</p>
                    <p className='users__info'>Nikita@gmail.com</p>
                </div>
                <div className='users__card'>
                     <p className='users__info'>Nikita</p>
                    <p className='users__info'>Nikita@gmail.com</p>
                </div>
            </div>
        );
    }
}

export default UsersList;