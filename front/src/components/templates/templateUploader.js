import React, { useState } from 'react';
// import axios from 'axios';
import tokenHttp from '../api/tokenHttp';
import styled from 'styled-components';

const StyledForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
`;

// const FileAddButton = styled.input`
//   font-family: 'Ftstardust';
//   background-color: #5ec9f2;
//   color: white;
//   border: none;

//   width: 120px;
//   height: 50px;

//   font-size: 18px;
//   font-weight: bold;

//   border-radius: 10px;

//   &:hover {
//     background-color: #3498db;
//     color: #fff;
//     cursor: pointer;
//   }
// `;

// const UploadButton = styled.button`
//   font-family: 'Ftstardust';
//   background-color: #5ec9f2;
//   color: white;
//   border: none;

//   width: 120px;
//   height: 50px;

//   font-size: 18px;
//   font-weight: bold;

//   border-radius: 10px;

//   &:hover {
//     background-color: #3498db;
//     color: #fff;
//     cursor: pointer;
//   }
// `;

function TemplateUploader() {
  const [templateImage, setTemplateImage] = useState(null);
  const [templateType, setTemplateType] = useState('');
  const [templateName, setTemplateName] = useState('');

  const handleImageUpload = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', templateImage);

    const templateSaveDto = {
      templateImage: templateImage,
      templateType: templateType,
      templateName: templateName,
      // userPk: null,
    };

    formData.append('templateSaveDto', templateSaveDto)

    try {
      // const response = await axios.post('https://i9b306.q.ssafy.io/api1/template/add-template', formData, {
      const response = await tokenHttp.post('https://i9b306.q.ssafy.io/api1/template/add-template', formData, {
        // params: templateSaveDto,
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': localStorage.getItem("accessToken"),
          "Access-Control-Allow-Origin" : "*",
        },
      });
      console.log('이미지 업로드 성공', response);
      alert('업로드 성공');
    } catch (error) {
      console.error('이미지 업로드 실패', error);
      console.log('accessToken : ' + localStorage.getItem('accessToken'))
      alert('업로드 실패');
    }
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile || !(selectedFile instanceof Blob)) {
      console.error('Invalid file');
      return;
    }
    console.log('selectedFile : ' + selectedFile);
    setTemplateImage(selectedFile);
  };

  return (
    <StyledForm>
      <form onSubmit={handleImageUpload}>
        <input type="file" accept="image/*" onChange={handleFileChange} />
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
        <button type="submit">템플릿 업로드</button>
      </form>
    </StyledForm>
  );
}

export default TemplateUploader;
