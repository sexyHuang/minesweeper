import { Button, Form, Input, message } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

type EmailRegisterFormProps = {
  onSuccess?: () => void;
};

export const EmailRegisterForm: React.FC<EmailRegisterFormProps> = ({
  onSuccess
}) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  return (
    <Form
      onFinish={async value => {
        setIsSubmitting(true);
        try {
          const res = await signIn('email', { ...value, redirect: false });
          if (!res?.ok) {
            throw new Error(res?.error ?? '注册失败');
          }
          message.success('注册邮件已发送, 请查收');
          onSuccess?.();
        } catch (e) {
          message.error('注册失败, 请重试');
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
      <Button
        type="primary"
        htmlType="submit"
        block
        size="large"
        loading={isSubmitting}
      >
        注册
      </Button>
    </Form>
  );
};
