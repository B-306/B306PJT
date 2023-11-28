import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserInfo = () => {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // 로컬 스토리지에서 액세스 토큰 가져오기
    const accessToken = localStorage.getItem('accessToken');

    // 액세스 토큰을 헤더에 포함하여 서버로 요청 보내기
    axios.get('https://k9b308.p.ssafy.io/api1/user/name', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    })
    .then(response => {
      // 요청이 성공하면 서버에서 받은 이름을 상태에 저장
      console.log(response.data)
      setUserName(response.data);
    })
    .catch(error => {
      console.error('서버 요청 실패:', error);
    });
  }, []);

  return (
    <div>
      <h2>{userName}</h2>
    </div>
  );
};

export default UserInfo;
