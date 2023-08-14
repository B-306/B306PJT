import React, { useState } from 'react';
// import axios from 'axios';
import styled from 'styled-components';

const StyledForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
`;

const UploadButton = styled.button`
  font-family: 'Ftstardust';
  background-color: #5ec9f2;
  color: white;
  border: none;

  width: 120px; /* 가로 크기를 100px로 설정 */
  height: 50px; /* 세로 크기를 50px로 설정 */

  font-size: 18px;
  font-weight: bold;

  border-radius: 10px;

  &:hover {
    background-color: #3498db; /* 호버 시 배경색 변경 */
    color: #fff; /* 호버 시 글씨 색 변경 */
    cursor: pointer;
  }
}`;


// const FileInput = styled.input`
//   display: none;
// `;

// const SelectImageButton = styled.label`
//   font-family: 'Ftstardust';
//   background-color: #5ec9f2;
//   color: white;
//   border: none;

//   width: 120px;
//   height: 50px;

//   font-size: 18px;
//   font-weight: bold;

//   border-radius: 10px;

//   display: flex;
//   justify-content: center;
//   align-items: center;

//   &:hover {
//     background-color: #3498db;
//     color: #fff;
//     cursor: pointer;
//   }
// `;

function TemplateUploader() {
    const [templateImageUrl, setTemplateImageUrl] = useState(null);
    const [templateType, setTemplateType] = useState('');
    const [templateName, setTemplateName] = useState('');
  
    const handleImageUpload = () => {
      // 프론트엔드 내에서 선택한 이미지 URL을 저장
      // 이 예제에서는 로컬 스토리지에 저장하도록 하겠습니다.
      localStorage.setItem('templateImageUrl', templateImageUrl);
      localStorage.setItem('templateType', templateType);
      localStorage.setItem('templateName', templateName);
  
      console.log('이미지 URL 저장 성공');
      alert('이미지 URL 저장 성공');
    };
  
    return (
      <StyledForm>
        {/* 이미지 URL 입력란 */}
        <input
          type="text"
          placeholder="이미지 URL"
          value={templateImageUrl}
          onChange={(e) => setTemplateImageUrl(e.target.value)}
        />
  
        <input
          type="text"
          placeholder="템플릿 유형"
          onChange={(e) => setTemplateType(e.target.value)}
        />
        <input
          type="text"
          placeholder="템플릿 이름"
          onChange={(e) => setTemplateName(e.target.value)}
        />
        <UploadButton onClick={handleImageUpload}>템플릿 업로드</UploadButton>
      </StyledForm>
    );
  }
  
  export default TemplateUploader;