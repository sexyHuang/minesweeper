import { CheckOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Input, message } from 'antd';
import Compact from 'antd/es/space/Compact';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export const NameInput: React.FC = () => {
  const { data, update } = useSession();
  const [editing, setEditing] = useState<boolean>(false);
  const [name, setName] = useState<string>(data?.user.name ?? '');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  useEffect(() => {
    setName(data?.user.name ?? '');
  }, [data?.user.name]);
  const submit = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/user', {
        method: 'POST',
        body: JSON.stringify({
          name
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        update({
          ...data,
          user: {
            ...data?.user,
            name
          }
        });
        message.success('修改成功');
      } else {
        throw new Error(await response.text());
      }
      setEditing(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!editing)
    return (
      <>
        {data?.user.name}
        <Button
          icon={<EditOutlined />}
          type="text"
          onClick={() => {
            setEditing(true);
          }}
        />
      </>
    );
  return (
    <Compact style={{ width: '20%' }}>
      <Input
        disabled={isSubmitting}
        value={name}
        placeholder="请输入用户名"
        onChange={e => {
          setName(e.target.value);
        }}
      />
      <Button
        disabled={!name}
        type="primary"
        icon={<CheckOutlined />}
        loading={isSubmitting}
        onClick={() => {
          submit();
        }}
      />
    </Compact>
  );
};
