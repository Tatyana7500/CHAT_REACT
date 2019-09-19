import React, { Component } from 'react';

class UsersList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='content'>
                <div className='users__title'>
                    <div className='users__info'>name</div>
                    <div className='users__info'>e-mail</div>
                </div>
                {this.props.usersList.map((item, index) => {
                    return (
                        <div className='users__card' key={index}>
                            <p className='users__info'>{item.name}</p>
                            <p className='users__info'>{item.email}</p>
                        </div>
                    );
                })
                }
            </div>
        );
    }
}

export default UsersList;