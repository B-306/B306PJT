import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const StyledForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
]
`;

// const FileAddButton = styled.input`
//   font-family: 'Ftstardust';
//   background-color: #5ec9f2;
//   color: white;
//   border: none;

//   width: 120px; /* 가로 크기를 100px로 설정 */
//   height: 50px; /* 세로 크기를 50px로 설정 */

//   font-size: 18px;
//   font-weight: bold;

//   border-radius: 10px;

//   /* 숨겨진 input 요소를 대체하는 버튼 스타일 */
//   &:hover {
//     background-color: #3498db; /* 호버 시 배경색 변경 */
//     color: #fff; /* 호버 시 글씨 색 변경 */
//     cursor: pointer;
//   }
// `;

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
`;

function TemplateUploader() {
    const [templateImageUrl, setTemplateImageUrl] = useState(null);
    const [templateType, setTemplateType] = useState(''); // templateType 상태 변수 추가
    const [templateName, setTemplateName] = useState(''); // templateName 상태 변수 추가
  
    const handleImageUpload = async () => {
      // 이미지 URL 업로드 요청을 보내고, 업로드 성공 시 이미지 URL 반환
      try {
        const response = await axios.post('/api1/template/add-template-url', {
          templateImageUrl: templateImageUrl, // 이미지 URL을 전송
          templateType: templateType,
          templateName: templateName,
          // userPk: 1, // 유저 아이디 혹은 식별자
        }, {
          headers: {
            'Content-Type': 'application/json',
            'accessToken': localStorage.getItem("accessToken"),
          },
        });
  
        // 이미지 저장이 성공하면 응답에서 이미지 URL 받아와서 활용
        const imageUrl = response.data.imageUrl;
        console.log('이미지 업로드 성공');
        console.log('이미지 URL:', imageUrl);
        alert('업로드 성공');
      } catch (error) {
        console.error('이미지 업로드 실패', error);
        alert('업로드 실패');
      }
    };
  
    return (
      <StyledForm>
        {/* 이미지 URL 입력란 */}
        <input type="text" placeholder="이미지 URL" onChange={(e) => setTemplateImageUrl(e.target.value)} />
  
        <input type="text" placeholder="템플릿 유형" onChange={(e) => setTemplateType(e.target.value)} />
        <input type="text" placeholder="템플릿 이름" onChange={(e) => setTemplateName(e.target.value)} />
        <UploadButton onClick={handleImageUpload}>템플릿 업로드</UploadButton>
      </StyledForm>
    );
  }
  
  export default TemplateUploader;