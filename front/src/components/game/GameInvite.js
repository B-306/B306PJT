import React, { useState } from 'react';
import styled from 'styled-components';

const InviteLink = () => {
  // 초대 링크 상태
  const [inviteLink, setInviteLink] = useState('');

  // 초대 링크 생성 함수
  const generateInviteLink = () => {
    // 예시로 현재 페이지 URL을 기반으로 초대 링크를 생성
    const currentURL = window.location.href;
    setInviteLink(currentURL);
  };

  return (
    <div>
      <h2>초대 링크</h2>
      {inviteLink ? (
        <p>
          아래 링크를 다른 사용자와 공유하세요:<br />
          <a href={inviteLink} target="_blank" rel="noopener noreferrer">{inviteLink}</a>
        </p>
      ) : (
        <p>초대 링크를 생성해주세요.</p>
      )}

      {/* 초대 링크 생성 버튼 */}
      <button onClick={generateInviteLink}>초대 링크 생성</button>
    </div>
  );
};

export default InviteLink;