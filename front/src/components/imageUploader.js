// import axios from 'axios';
import tokenHttp from './api/tokenHttp';

// 이미지를 서버로 업로드하는 함수
const uploadImageToServer = async (imageBlob) => {
  const formData = new FormData();
  formData.append('file', imageBlob);
  formData.append('type', 'image/png'); // 추가 필드: type 값f
  
  try {
    const response = await tokenHttp.post('https://i9b306.q.ssafy.io/api1/putimage', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': localStorage.getItem('accessToken'),
      },
    });
    
    // 업로드 결과 처리
    if (response.status === 202) {
      console.log('이미지 업로드 성공');
      // 여기서!!!
      // 추가로 처리할 내용을 여기에 작성할 수 있습니다.
      return response.data;
    }
  } catch (error) {
    console.error('이미지 업로드 실패:', error);
    // 실패 시 처리할 내용을 여기에 작성할 수 있습니다.
  }
};

export default uploadImageToServer;