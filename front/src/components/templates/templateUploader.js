import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const StyledForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
`;

const FileAddButton = styled.input`
  font-family: 'Ftstardust';
  background-color: #5ec9f2;
  color: white;
  border: none;

  width: 120px;
  height: 50px;

  font-size: 18px;
  font-weight: bold;

  border-radius: 10px;

  &:hover {
    background-color: #3498db;
    color: #fff;
    cursor: pointer;
  }
`;

const UploadButton = styled.button`
  font-family: 'Ftstardust';
  background-color: #5ec9f2;
  color: white;
  border: none;

  width: 120px;
  height: 50px;

  font-size: 18px;
  font-weight: bold;

  border-radius: 10px;

  &:hover {
    background-color: #3498db;
    color: #fff;
    cursor: pointer;
  }
`;

function TemplateUploader() {
  const [templateImage, setTemplateImage] = useState(null);
  const [templateType, setTemplateType] = useState('');
  const [templateName, setTemplateName] = useState('');

  const handleImageUpload = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', templateImage);

    const templateSaveDto = {
      templateImage: '',
      templateType: templateType,
      templateName: templateName,
      userPk: null,
    };

    try {
      const response = await axios.post('https://i9b306.q.ssafy.io/api1/template/add-template', formData, {
        params: templateSaveDto,
        headers: {
          'Content-Type': 'multipart/form-data',
          'accessToken': localStorage.getItem("accessToken"),
        },
      });
      console.log('이미지 업로드 성공', response);
      alert('업로드 성공');
    } catch (error) {
      console.error('이미지 업로드 실패', error);
      alert('업로드 실패');
    }
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile || !(selectedFile instanceof Blob)) {
      console.error('Invalid file');
      return;
    }
    setTemplateImage(selectedFile);
  };

  return (
    <StyledForm>
      <form onSubmit={handleImageUpload}>
        <input type="file" accept="image/*" onChange={handleFileChange} id="selectedFile1" hidden />
        <FileAddButton
          type="button"
          value="파일추가"
          onClick={() => {
            document.getElementById('selectedFile1').click();
          }}
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
        <UploadButton type="submit">템플릿 업로드</UploadButton>
      </form>
    </StyledForm>
  );
}

export default TemplateUploader;
