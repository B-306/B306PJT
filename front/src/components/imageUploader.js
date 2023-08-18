import axios from 'axios';

// 이미지를 서버로 업로드하는 함수
const uploadImageToServer = async (imageBlob) => {
  const formData = new FormData();
  formData.append('file', imageBlob);

  try {
    const response = await axios.post('/putimage', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    // 업로드 결과 처리
    if (response.status === 202) {
      console.log('이미지 업로드 성공');
      // 추가로 처리할 내용을 여기에 작성할 수 있습니다.
    }
  } catch (error) {
    console.error('이미지 업로드 실패:', error);
    // 실패 시 처리할 내용을 여기에 작성할 수 있습니다.
  }
};

export default uploadImageToServer;