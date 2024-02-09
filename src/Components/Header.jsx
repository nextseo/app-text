import React from 'react'

const Header = () => {

  const handleLogout = ()=>{
    localStorage.clear()
    setTimeout(() => {
      window.location.reload()
    }, 1500);
  }
  return (
    <div className='bg-white py-5 px-5 shadow-md flex justify-between'>
        <h2>ระบบตรวจจับคำผิด / คำไม่ถูกต้อง</h2>
        <button className='bg-red-500 text-white px-4 py-2 rounded-lg' onClick={handleLogout}>ออกจากระบบ</button>
    </div>
  )
}

export default Header