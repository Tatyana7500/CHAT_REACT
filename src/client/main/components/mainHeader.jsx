import React from 'react';
import PropTypes from 'prop-types';

const MainHeader = props => {
    const { name, email } = props;
    
    return (
        <div className='header'>
            <div className='wrapper header__wrapper'>
                <div className='info'>
                    <span>Name:</span>
                    <span className='info__name'>{name} </span>
                    <span>E-mail:</span>
                    <span className='info__email'>{email}</span>
                </div>
                <a href='' className='btn btn-main logout' id='logOut'>log out</a>

            </div>
        </div>
    );
};

MainHeader.propTypes = {
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
};

export default MainHeader;