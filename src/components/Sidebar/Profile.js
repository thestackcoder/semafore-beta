import React, { Component } from 'react'
import avatar from "../../images/avatar.png";

class Profile extends Component {
    state = {}

    render() {
        return (
            <div className="list-group list-group-flush">
                <div className="profile list-group-item list-group-item-action bg-dark"><img src={avatar} alt="avatar" /> James Fransco</div>
            </div>
        )
    }
}

export default Profile;
