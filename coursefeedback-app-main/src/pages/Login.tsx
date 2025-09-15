import { LoginForm } from '@/components/auth/LoginForm';
import { AuthLayout } from '@/components/auth/AuthLayout';

const Login = () => {
  return (
    <AuthLayout
      title="Welcome Back"
      description="Sign in to your EduFeedback account"
      linkText="Don't have an account?"
      linkHref="/signup"
      linkLabel="Sign up here"
    >
      <LoginForm />
    </AuthLayout>
  );
};

export default Login;