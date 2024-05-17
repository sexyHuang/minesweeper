import { Button, Modal, Space, message } from 'antd';
import { signIn, useSession } from 'next-auth/react';
import { UserInfo } from '../UserInfo';
import { useEffect } from 'react';
import { PwdForm } from '../PwdForm';
import { useForm } from 'antd/es/form/Form';
import { modalLogin } from '../LoginModal';

export const User: React.FC = () => {
  const { data: session } = useSession();
  const [form] = useForm();
  useEffect(() => {
    if (session?.user.noPwd) {
      Modal.confirm({
        title: '请设置密码',
        cancelButtonProps: {
          style: {
            display: 'none'
          }
        },
        closable: false,
        okText: '确定',
        async onOk() {
          const value = await form.validateFields();
          try {
            const res = await fetch('/api/user/password', {
              method: 'POST',
              body: JSON.stringify({
                password: value.password
              }),
              headers: {
                'Content-Type': 'application/json'
              }
            });
            if (res.ok) {
              message.success('密码设置成功');
            } else {
              throw new Error(await res.json());
            }
          } catch (e: any) {
            message.error(e?.error ?? e?.message);
            throw e;
          }
        },
        content: (
          <PwdForm
            form={form}
            style={{
              marginTop: 20
            }}
          />
        )
      });
    }
  }, [form, session?.user.noPwd]);

  if (!session) {
    return (
      <Space>
        <Button
          type="primary"
          onClick={() => {
            modalLogin();
          }}
        >
          登录
        </Button>
        <Button
          type="primary"
          ghost
          onClick={() => {
            modalLogin('register');
          }}
        >
          注册
        </Button>
      </Space>
    );
  }
  return <UserInfo user={session.user} />;
};
