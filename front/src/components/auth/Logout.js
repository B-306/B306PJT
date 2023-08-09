import {useNavigate} from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();
    setTimeout(function() {
      const url = `/login`;
      navigate(url);
      console.log('로그인 페이지 리다이렉트');
    }, 1);
    return(
        
    localStorage.clear()
    )
}
    

export default Logout