import { Modal, Tabs } from 'antd';
import { EmailLoginForm } from './EmailLoginForm';
import { EmailRegisterForm } from './EmailRegisterForm';
import { CSSProperties } from 'styled-components';

type ActiveKey = 'login' | 'register';
export const LoginForm: React.FC<{
  defaultActiveKey?: ActiveKey;
  onSuccess?: (type: ActiveKey) => void;
  style?: CSSProperties;
  className?: string;
}> = ({ defaultActiveKey = 'login', onSuccess, ...props }) => {
  return (
    <Tabs
      {...props}
      defaultActiveKey={defaultActiveKey}
      items={[
        {
          key: 'login',
          label: '登录',
          children: (
            <EmailLoginForm
              onSuccess={() => {
                onSuccess?.('login');
              }}
            />
          )
        },
        {
          key: 'register',
          label: '注册',
          children: (
            <EmailRegisterForm
              onSuccess={() => {
                onSuccess?.('register');
              }}
            />
          )
        }
      ]}
    />
  );
};

export function modalLogin(activeKey?: ActiveKey) {
  const m = Modal.info({
    icon: null,
    width: 340,
    closable: true,
    okButtonProps: { style: { display: 'none' } },

    content: (
      <LoginForm
        defaultActiveKey={activeKey}
        onSuccess={type => {
          if (type === 'login') {
            m.destroy();
          }
        }}
      />
    )
  });
}
