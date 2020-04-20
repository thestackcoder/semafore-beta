import React, { useState } from 'react'
import avatar from "../../images/avatar.png";
import { useAuth } from "../../providers/auth-provider";

function Profile() {
    const { user, logout } = useAuth();
    const [userInfo, setUserInfo] = useState();

    const verifyUser = async () => {
        const response = await fetch(`/.netlify/functions/user`);
        if (response.ok) {
            setUserInfo(await response.text());
        } else if (response.status === 401) {
            logout();
        }
    };

    return (
        <div className="list-group list-group-flush">
            <div className="profile list-group-item list-group-item-action bg-dark"><img src={avatar} alt="avatar" />{user.email}</div>
            {/* <button onClick={verifyUser}>Verify user</button>
            {userInfo && <p>User ok: {userInfo}</p>} */}
        </div>
    )
}

export default Profile;
