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

const FileAddButton = styled.input`
  font-family: 'Ftstardust';
  background-color: #5ec9f2;
  color: white;
  border: none;

  width: 120px; /* 가로 크기를 100px로 설정 */
  height: 50px; /* 세로 크기를 50px로 설정 */

  font-size: 18px;
  font-weight: bold;

  border-radius: 10px;

  /* 숨겨진 input 요소를 대체하는 버튼 스타일 */
  &:hover {
    background-color: #3498db; /* 호버 시 배경색 변경 */
    color: #fff; /* 호버 시 글씨 색 변경 */
    cursor: pointer;
  }
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
            templateImage: templateImage.name,
            templateType: templateType,
            templateName: templateName,
            // userPk: 1, // 유저 아이디 혹은 식별자
        };

        try {
            await axios.post('/api1/template/add-template', formData, {
                params: templateSaveDto,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'accessToken': localStorage.getItem("accessToken"),
                },
            });
            console.log('이미지 업로드 성공');
            alert('업로드 성공')
        } catch (error) {
            console.error('이미지 업로드 실패', error);
            console.log('템플릿 타입 : ' + templateSaveDto.templateType);
            alert('업로드 실패')
        }
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (!selectedFile || !(selectedFile instanceof Blob)) {
            // 파일이 선택되지 않았거나 Blob 형식이 아닌 경우 처리
            console.error('Invalid file');
            return;
          }
        setTemplateImage(selectedFile);
    };

    return (
        <StyledForm>
            <form onSubmit={handleImageUpload}> {/* 폼을 <form> 요소로 감싸줍니다 */}
                <input type="file" accept="image/*" onChange={handleFileChange} id="selectedFile1" hidden/>
                <FileAddButton type="button" value="파일추가"
                    onClick={() => {
                        document.getElementById('selectedFile1').click();
                    }}
                />
                <input type="text" placeholder="템플릿 유형" onChange={(e) => setTemplateType(e.target.value)} />
                <input type="text" placeholder="템플릿 이름" onChange={(e) => setTemplateName(e.target.value)} />
                <UploadButton type="submit">템플릿 업로드</UploadButton>
            </form>
        </StyledForm>
    );
}

export default TemplateUploader;
