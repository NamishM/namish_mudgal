import React from "react";

const UserProfile = ({
    avatar,
    first_name,
    last_name,
    id,
    callbackFromParent,
}) => (
    <div className="user-profile">
        <div className="profile-container">
            <div className="user-image"><img src={avatar} alt={first_name} className="prof-img" /></div>
            <div className="user-name">{`${first_name} ${last_name}`}</div>
        </div>
        <button
            className="action-button"
            onClick={() => 
                callbackFromParent(id)
            }
        >
            Delete
        </button>
    </div>
);

export default UserProfile;
