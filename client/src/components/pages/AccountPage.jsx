import React from 'react';

export default function AccountPage() {
  return (
    <div>
      <h1>Личный кабинет пользователя {user}</h1>
      <div className="cardOfUser">
        <div className="userName">userName</div>
        <Button size="sm" className="userNameButton">
          userName
        </Button>
        <div className="userEmail">userEmail</div>
        <div className="userHashPass">userHashPass</div>
        <Button size="sm" className="userHashPassButton">
          userHashPass
        </Button>
        <div className="userProgress">userProgress</div>
        <div className="userGroups">userGroups</div>
        <div className="userIsAdmin">userIsAdmin</div>
      </div>
    </div>
  );
}
