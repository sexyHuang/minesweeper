'use client';
import { LoginForm } from '../component/LoginModal';
import { Box } from './styled';

const Signin: React.FC = () => {
  const redirect = decodeURIComponent(
    new URLSearchParams(window.location.search).get('callbackUrl') ?? '/'
  );
  return (
    <Box>
      <LoginForm
        onSuccess={type => {
          if (type === 'login') {
            window.location.href = redirect;
          }
        }}
      />
    </Box>
  );
};

export default Signin;
