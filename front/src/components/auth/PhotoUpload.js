import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { setPhoto } from '../../redux/modules/photoSlice';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import styled from 'styled-components';


const StyledForm = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
]
`;


function PhotoUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const dispatch = useDispatch()
  // const storedImageUrl = useSelector((state) => state.photo.photoUrl);
  

  useEffect(() => {
    // 로컬 스토리지에서 이미지 URL을 불러와서 상태로 설정
    const storedImageUrl = localStorage.getItem('imageUrl');
    if (storedImageUrl) {
      setPreviewUrl(storedImageUrl);
    }
  }, []);
  // }, [storedImageUrl]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file || !(file instanceof Blob)) {
      // 파일이 선택되지 않았거나 Blob 형식이 아닌 경우 처리
      console.error('Invalid file');
      return;
    }
    setSelectedFile(file);

    // 파일을 미리 보기 위해 FileReader를 사용
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result);
      // setImageUrl(URL.createObjectURL(file));
      setImageUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      // FormData를 사용하여 선택한 파일을 서버로 업로드
      const formData = new FormData();
      formData.append('file', selectedFile);
      
      
      // 서버로 업로드하는 API 호출
      const response = await axios.post("https://i9b306.q.ssafy.io/api1/image/profile", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'accessToken': `${localStorage.getItem("accessToken")}`
        }
      })

      // console.log(response)
      console.log("사진 업로드")
      // 업로드가 성공하면 미리보기를 감춥니다.
      setPreviewUrl(null);
      console.log(response.data)
      setImageUrl(imageUrl);
      // console.log(imageUrl)
      // localStorage.setItem('imageUrl', imageUrl);
      // const imageUrl = response.data.imageUrl;
      // response.data가 formdata {}로 빈 값이 출력 
      // setPreviewUrl(imageUrl);
      // console.log("나는 너의~~~~~~~~~~~~~~~~~~" + formData.get('accessToken'));
      alert('사진 업로드가 완료되었습니다.');
      dispatch(setPhoto(imageUrl))
    } catch (error) {
      alert('사진 업로드에 실패했습니다.');
      console.error(error);
    }
  };

  const photoUrl = useSelector((state) => state.photo.photoUrl);
  // console.log("photoUrl : ", photoUrl);
  // const imgUrl = 'https://i9b306.q.ssafy.io/'+ photoUrl;
  return (
    <div>
      {/* 이미지 미리 보기 */}
      {previewUrl && <img src={previewUrl} alt="Preview" width="200" height="200" />}
      {photoUrl && <img src={photoUrl} alt="Profile" width="200" height="200" />}
      {/* <img src={imgUrl} alt="Profile" width="200" height="200" /> */}
      <StyledForm onSubmit={handleSubmit}>
      {/* 파일 선택 버튼 */}
      <input type="file" accept="image/*" onChange={handleFileChange} id="selectedFile1" hidden/>
      <input type="button" value="파일추가"
        onClick={() => {
          document.getElementById('selectedFile1').click();
        }}
      />
      {/* 업로드 버튼 */}
      <button>업로드</button>
      </StyledForm>
      {/* {imageUrl && <img src={imageUrl} alt='Uploaded' />} */}
    </div>
  );
}

export default PhotoUpload;