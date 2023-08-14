import React, { useState, useRef } from 'react';
import axios from 'axios';
import { setPhoto } from '../../redux/modules/photoSlice';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import styled from 'styled-components';


const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
]
`;

// const FileAddButton = styled.input`
//   font-family: 'Ftstardust';
//   background-color: #5ec9f2;
//   color: white;
//   border: none;

//   width: 100px; /* 가로 크기를 100px로 설정 */
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

  width: 100px; /* 가로 크기를 100px로 설정 */
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


function PhotoUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  // const [previewUrl, setPreviewUrl] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const dispatch = useDispatch()
  // const storedImageUrl = useSelector((state) => state.photo.photoUrl);
  const fileInput = useRef(null)

  // useEffect(() => {
  //   // 로컬 스토리지에서 이미지 URL을 불러와서 상태로 설정
  //   const storedImageUrl = localStorage.getItem('imageUrl');
  //   if (storedImageUrl) {
  //     setPreviewUrl(storedImageUrl);
  //   }
  // }, []);
  // }, [storedImageUrl]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    } else { // 업로드 취소 시
      setImageUrl(photoUrl)
      return
    }

    // 파일을 미리 보기 위해 FileReader를 사용
    const reader = new FileReader();
    reader.onloadend = () => {
      // setPreviewUrl(reader.result);
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

      console.log("사진 업로드")
      // 업로드가 성공하면 미리보기를 감춥니다.
      // setPreviewUrl(null);
      console.log(response.data)
      setImageUrl(imageUrl);
  
      alert('사진 업로드가 완료되었습니다.');
      dispatch(setPhoto(imageUrl))
    } catch (error) {
      alert('사진 업로드에 실패했습니다.');
      console.error(error);
    }
  };

  const photoUrl = useSelector((state) => state.photo.photoUrl);
  
  return (
    <div>
      {/* 이미지 미리 보기 */}
      {/* {previewUrl && <img src={previewUrl} alt="Preview" width="200" height="200" />} */}
      {photoUrl && <img src={photoUrl} alt="Profile" width="200" height="200" />}
      {/* <img src={imgUrl} alt="Profile" width="200" height="200" /> */}
      {/* <StyledForm onSubmit={handleSubmit}> */}
      <StyledForm onSubmit={handleSubmit}>
      {/* 파일 선택 버튼 */}
      <input type="file" accept="image/*" onChange={handleFileChange} ref={fileInput} id="selectedFile1" />
      {/* <FileAddButton type="button" value="사진변경"
        onClick={() => {
          document.getElementById('selectedFile1').click();
        }}
      /> */}
      {/* 업로드 버튼 */}
      {/* <UploadButton type="submit" onSubmit={handleSubmit}>업로드</UploadButton> */}
      </StyledForm>
    </div>
  );
}

export default PhotoUpload;