import React, { Component } from 'react';
import { fetchUsers } from '../../services/dataService';

class HallUsersCard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            users: []
        }
    }

    componentDidMount() {
        fetchUsers( (resp) => {
            this.setState({users: resp});
        } )
    }

    render() {
        return (
            <div className="card">
            <div className="card-body">
                <h2 className="card-title">Our User's Sites</h2>
                <div className="users-container">
                <ul class="list-group list-group-flush">
                {this.state.users.map( (user) => {
                    return <li className="list-group-item" key={user.name}>
                        <a target="_blank" href={user.url}>{user.name}</a>
                    </li>
                })}
                </ul>
                </div>
                </div>
        </div>
        );
    }
}

export default HallUsersCard;