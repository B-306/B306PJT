import React, { useState } from 'react';
import axios from 'axios';

function TemplateUploader() {
    const [templateImage, setTemplateImage] = useState(null);
    const [templateType, setTemplateType] = useState('');
    const [templateName, setTemplateName] = useState('');

    const handleImageUpload = async () => {
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
            alert('업로드 실패')
        }
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setTemplateImage(selectedFile);
    };

    return (
        <div>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <input type="text" placeholder="템플릿 유형" onChange={(e) => setTemplateType(e.target.value)} />
            <input type="text" placeholder="템플릿 이름" onChange={(e) => setTemplateName(e.target.value)} />
            <button onClick={handleImageUpload}>템플릿 업로드</button>
        </div>
    );
}

export default TemplateUploader;
