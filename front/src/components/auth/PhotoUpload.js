import React, { useState } from 'react';
import axios from 'axios';

function PhotoUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    // 파일을 미리 보기 위해 FileReader를 사용
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    try {
      // FormData를 사용하여 선택한 파일을 서버로 업로드
      const formData = new FormData();
      formData.append('file', selectedFile);
      
      // 서버로 업로드하는 API 호출
      await axios.post('/profile/add-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      alert('사진 업로드가 완료되었습니다.');
    } catch (error) {
      alert('사진 업로드에 실패했습니다.');
      console.error(error);
    }
  };

  return (
    <div>
      {/* 이미지 미리 보기 */}
      {previewUrl && <img src={previewUrl} alt="Preview" width="200" height="200" />}
      
      {/* 파일 선택 버튼 */}
      <input type="file" accept="image/*" onChange={handleFileChange} />

      {/* 업로드 버튼 */}
      <button onClick={handleSubmit}>업로드</button>
    </div>
  );
}

export default PhotoUpload;