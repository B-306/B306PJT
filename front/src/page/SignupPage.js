import AuthTemplate from '../components/auth/AuthTemplate';
import AuthForm from '../components/auth/AuthForm';
// import AuthMail from '../components/auth/AuthMail'

const SignupPage = () => {
  return (
    <AuthTemplate>
      <AuthForm type="signup" />
      {/* <AuthMail></AuthMail> */}
    </AuthTemplate>
  );
};

export default SignupPage;