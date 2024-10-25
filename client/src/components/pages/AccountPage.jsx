import { useState } from 'react';

export default function AccountPage({ user }) {
  const [formUser, setFormUser] = useState({
    userName: '',
    userEmail: '',
    userHashPass: '',
    userProgress: '',
    userProgress: '',
  });

  return (
    <>
      <h1>Личный кабинет пользователя user</h1>
      <div className="userName">userName</div>
      <div className="userEmail">userEmail</div>
      <div className="userHashPassButton">userHashPass</div>
      <div className="userProgress">userProgress</div>
      <ol className="userGroups">размап userGroups</ol>




      <div className="userIsAdmin">userIsAdmin</div>
    </>
  );
}



// {messages.map((message) => (
//     <MessageCard
//       key={message.id}
//       message={message}
//       onDelete={() => handleDeletePost(message.id)}
//     />
//   ))}