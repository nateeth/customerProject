import React from 'react'

export default function AuthPage({user}) {
    const signupHandler = (event) => {
        event.preventDefault();
        const data = Object.fromEntries(new FormData(event.target));
        const res = await axiosInstance.post('/auth/signup', data);
        if (res.status !== 200) alert('Ошибка регистрации');
        setUser(res.data.user);
        setAccessToken(res.data.accessToken);
    }
  
    return (
    <div>
        <div><p>{user?.id ? `Привет, ${user.name}` : 'Гостевой аккаунт'}</p></div>
        <form>
      <input name="email" type="email" placeholder="Введи email" />
      <input name="password" type="password" placeholder="Введи пароль" />
      <input name="name" type="text" placeholer="Введи имя пользователя" />
      <button type="submit">Sign up</button>
    </form>
    </div>
  )
}
