import { Button, Form, Input, message } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import Password from 'antd/es/input/Password';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

type EmailLoginFormProps = {
  onSuccess?: () => void;
};

export const EmailLoginForm: React.FC<EmailLoginFormProps> = ({
  onSuccess
}) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  return (
    <Form
      onFinish={async value => {
        setIsSubmitting(true);
        try {
          const res = await signIn('emailPassword', {
            ...value,
            redirect: false
          });
          if (!res?.ok) {
            throw new Error(res?.error ?? '登录失败');
          }
          message.success('登录成功');
          onSuccess?.();
        } catch (e) {
          message.error('密码或邮箱错误，登录失败');
        } finally {
          setIsSubmitting(false);
        }
      }}
    >
      <FormItem
        name="email"
        rules={[
          {
            type: 'email',
            message: '请输入正确的邮箱'
          },
          {
            required: true,
            message: '请输入邮箱'
          }
        ]}
      >
        <Input placeholder="请输入邮箱" />
      </FormItem>
      <FormItem
        name="password"
        rules={[
          {
            required: true,
            message: '请输入密码'
          }
        ]}
      >
        <Password placeholder="请输入密码" />
      </FormItem>
      <Button
        type="primary"
        htmlType="submit"
        block
        size="large"
        loading={isSubmitting}
      >
        登录
      </Button>
    </Form>
  );
};
