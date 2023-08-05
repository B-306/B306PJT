import { useSelector } from 'react-redux';

const privateKey = process.env.REACT_APP_PRIVATE_KEY;

export function encodeState(str) {
  if (!str) {
    return null
  }
  const key = [];
  console.log(privateKey);
  console.log('str',typeof str, str)
  const keyLength = privateKey.length;
  for (let i = 0; i < keyLength; i++) {
    const asciiCode = privateKey.charCodeAt(i);
    key.push(asciiCode);
  }
  const asciiCodes = [];
  for (let i = 0; i < str.length; i++) {
    const asciiCode = str.charCodeAt(i) + key[i%(keyLength)];
    asciiCodes.push(asciiCode);
  }
  return asciiCodes;
}

export function decodeState(arr) {
  if (!arr) {
    return null
  }
  let str = '';
  console.log(arr)
  const key = [];
  const keyLength = privateKey.length;
  for (let i = 0; i < keyLength; i++) {
    const asciiCode = privateKey.charCodeAt(i);
    key.push(asciiCode);
  }
  for (let i = 0; i<arr.length; i++) {
    const char = String.fromCharCode(arr[i]-key[i%(keyLength)]);
    str += char;
  }
  return str;
}

export default function GetDecodedState() {
    const accessToken = decodeState(useSelector((state) => state.auth.accessToken));
    const refreshToken = decodeState(useSelector((state) => state.auth.refreshToken));
    const userName = decodeState(useSelector((state) => state.auth.userName));
    const userEmail = decodeState(useSelector((state) => state.auth.userEmail));
    // const photoUrl = decodeState(useSelector((state) => state.photo.photoUrl));
      // 복호화된 정보를 객체 형태로 리턴
    return {
      accessToken,
      refreshToken,
      userName,
      userEmail,
      // photoUrl
    };
}
