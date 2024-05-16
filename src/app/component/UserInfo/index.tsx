import { Session } from 'next-auth';
import { Card } from './styled';
import { Avatar, Dropdown } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export type UserInfoProps = {
  user?: Session['user'];
};

export const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  const { push } = useRouter();
  return (
    <Card>
      <Dropdown
        arrow={{
          pointAtCenter: true
        }}
        menu={{
          items: [
            {
              label: '设置',
              key: 'setting',
              onClick() {
                push('/userInfo');
              }
            },
            {
              label: '登出',
              key: 'logout',
              onClick() {
                signOut();
              }
            }
          ]
        }}
      >
        <Avatar src={user?.image} icon={<UserOutlined />} />
      </Dropdown>
      <div>{user?.name ?? user?.email}</div>
    </Card>
  );
};
