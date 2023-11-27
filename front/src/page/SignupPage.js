import AuthTemplate from '../components/auth/AuthTemplate';
import AuthForm from '../components/auth/AuthForm';

const SignupPage = () => {
  return (
    <AuthTemplate>
      <AuthForm type="signup" />
    </AuthTemplate>
  );
};

export default SignupPage;