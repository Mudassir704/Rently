import React from 'react';

const Profile = ({ user }) => {
    return (
        <React.Fragment>
            <h1>{user.name}</h1>
            <h3>{user.email}</h3>
        </React.Fragment>
    );
}

export default Profile;