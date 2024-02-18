import React, { useState } from "react";

const Login = () => {
  const [data, setData] = useState({});
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if(data.username === "admin" && data.password === "1234"){
        localStorage.setItem('Token_app_text', 1234)

        setTimeout(() => {
            window.location.reload()
        }, 1500);
    }else {
        window.location.reload()
    }
  };
  return (
    <div className="bg-gray-200 h-screen flex justify-center">
      <div className="bg-white mx-60 my-40 px-10 py-5 rounded-lg">

        <h1 className="text-3xl text-center mb-4">เข้าสู่ระบบ</h1>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="username"
            className="bg-white px-2 py-2 border-2 border-gray-200 rounded-md"
            name="username"
            onChange={handleChange}
          />
          <br />
          <input
            type="password"
            placeholder="password"
            name="password"
            onChange={handleChange}
            className="bg-white px-2 py-2 border-2 border-gray-200 rounded-md mt-4"

          />
          <br /><br />
          <button className="mt-0 w-full bg-black text-white px-2 py-2 rounded-md" type="submit">เข้าสู่ระบบ</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
