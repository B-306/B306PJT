import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

function UserInfo() {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    // 로그인된 상태에서 토큰 가져오기 (로컬 스토리지에서 가져온다고 가정)
    const token = localStorage.getItem('jwtToken');


    // 토큰이 존재할 경우에만 디코드
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const name = decodedToken.name;
        setUserInfo(name); // 유저 이름을 상태에 저장
      } catch (error) {
        console.error('Invalid token:', error);
      }
    }
  }, []);

  return (
    <div>
      {userInfo && <p>유저 이름: {userInfo}</p>}
    </div>
  );
}

export default UserInfo;