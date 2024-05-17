'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { LoginForm } from '../component/LoginModal';
import { Box } from './styled';

const Signin: React.FC = () => {
  const searchParams = useSearchParams();
  const { push } = useRouter();
  const redirect = decodeURIComponent(searchParams.get('callbackUrl') ?? '/');
  return (
    <Box>
      <LoginForm
        onSuccess={type => {
          if (type === 'login') {
            push(redirect);
          }
        }}
      />
    </Box>
  );
};

export default Signin;
