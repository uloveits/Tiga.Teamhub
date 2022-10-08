import LoginHeader from '@/pages/login/comps/LoginHeader';
import LoginForm from '@/pages/login/comps/LoginForm';
import './index.less';

const Login = () => {
  return (
    <div className="app-login">
      <LoginHeader />
      <div className="components-form-normal-login">
        <LoginForm />
      </div>
      <div className="footer">皖ICP备19025030号-1</div>
    </div>
  );
};

export default Login;
