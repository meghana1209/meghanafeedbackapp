import { SignupForm } from '@/components/auth/SignupForm';
import { AuthLayout } from '@/components/auth/AuthLayout';

const Signup = () => {
  return (
    <AuthLayout
      title="Create Account"
      description="Join EduFeedback to share your course experiences"
      linkText="Already have an account?"
      linkHref="/login"
      linkLabel="Sign in here"
    >
      <SignupForm />
    </AuthLayout>
  );
};

export default Signup;