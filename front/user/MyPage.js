import React, { useEffect, useState } from 'react';

function MyPage() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [email] = useState('user@example.com'); // 수정 불가능한 정보

  // 마이페이지 정보를 가져오는 API 호출 또는 데이터 로딩 로직
  useEffect(() => {
    fetchMyPageData(); // 마이페이지 정보를 가져오는 API 호출
  }, []);

  // 마이페이지 정보를 가져오는 함수
  const fetchMyPageData = () => {
    // GET 요청을 통해 마이페이지 정보를 가져온다고 가정
    // 가져온 정보를 적절한 상태 변수에 설정
    setName('John Doe');
    setPassword('********');
    setProfileImage('path/to/profile-image.jpg');
  };

  // 이름 변경 핸들러
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  // 비밀번호 변경 핸들러
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // 프로필 사진 변경 핸들러
  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    // 파일 업로드 또는 처리 로직
    // 예시: 파일을 서버에 업로드하고, 업로드된 파일의 경로를 상태로 설정
    setProfileImage(URL.createObjectURL(file));
  };

  return (
    <div>
      <h2>마이페이지</h2>
      <div>
        <label>이름:</label>
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
        />
      </div>
      <div>
        <label>비밀번호:</label>
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <div>
        <label>프로필 사진:</label>
        <input
          type="file"
          onChange={handleProfileImageChange}
        />
        {profileImage && <img src={profileImage} alt="프로필 사진" />}
      </div>
      <div>
        <label>이메일:</label>
        <span>{email}</span>
      </div>
    </div>
  );
}

export default MyPage;