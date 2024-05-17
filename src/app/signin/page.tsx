'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { LoginForm } from '../component/LoginModal';
import { Box } from './styled';
import { Suspense } from 'react';

const SignForm: React.FC = () => {
  const searchParams = useSearchParams();
  const { push } = useRouter();
  const redirect = decodeURIComponent(searchParams.get('callbackUrl') ?? '/');
  return (
    <LoginForm
      onSuccess={type => {
        if (type === 'login') {
          push(redirect);
        }
      }}
    />
  );
};

const Signin: React.FC = () => {
  return (
    <Box>
      <Suspense>
        <SignForm />
      </Suspense>
    </Box>
  );
};

export default Signin;
