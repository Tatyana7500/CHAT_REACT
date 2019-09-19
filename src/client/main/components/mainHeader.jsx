import React, { Component } from 'react';

class MainHeader extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className='header'>
                <div className='wrapper header__wrapper'>
                    <div className='info'>
                        <p>Name: <span className='info__name'>{this.props.name} </span></p>
                        <p>E-mail: <span className='info__email'>{this.props.email}</span></p>
                    </div>
                    <a href='' className='btn btn-main logout' id='logOut'>log out</a>
                </div>
            </div>
        );
    }
}

export default MainHeader;