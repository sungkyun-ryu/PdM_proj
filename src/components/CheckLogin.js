import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../views/layouts/Nav';

const CheckLogin = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('Token');
    const userid = sessionStorage.getItem('userid');
    
    if (!(token || userid)) {
      alert("Please log in first.");
      navigate('/login'); // 로그인 페이지로 리디렉션
    } else {
      setLoading(false);  // 로딩 상태 종료
    }
  }, [navigate]);

  if (loading) {
    // 로그인 검증 동안 Nav만 출력
    return (
      <header className='bg-black p-3'>
        <Nav />
      </header>
    );
  }

  // 인증이 완료되면 자식 컴포넌트를 렌더링
  return <>{children}</>;
};

export default CheckLogin;
