import React, { Component } from 'react';

class MainHeader extends Component {
    render() {
        return (
            <div className='header'>
                <div className='wrapper header__wrapper'>
                    <div className='info'>
                        <p>Name: <span className='info__name'> </span></p>
                        <p>E-mail: <span className='info__email'> </span></p>
                    </div>
                    <a href='' className='btn btn-main logout' id='logOut'>log out</a>
                </div>
            </div>
        );
    }
}

export default MainHeader;