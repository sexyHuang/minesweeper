'use client';

import { EditOutlined, UserOutlined } from '@ant-design/icons';
import {
  Avatar,
  Button,
  Descriptions,
  Form,
  Input,
  Typography,
  Upload
} from 'antd';
import DescriptionsItem from 'antd/es/descriptions/Item';
import { useSession } from 'next-auth/react';
import { Box } from './styled';
import { UploadAvatar } from '../component/UploadAvatar';
import { NameInput } from '../component/NameInput';

const UserInfo: React.FC = () => {
  const { data } = useSession();
  return (
    <Box>
      <Typography.Title level={4}>个人信息</Typography.Title>
      <UploadAvatar />
      <Descriptions
        contentStyle={{
          alignItems: 'center',
          height: 32
        }}
        labelStyle={{
          alignItems: 'center',
          height: 32
        }}
        column={1}
      >
        <DescriptionsItem label="用户名">
          <NameInput />
        </DescriptionsItem>
        <DescriptionsItem label="邮箱">
          {data?.user.email ?? ''}
        </DescriptionsItem>
      </Descriptions>
    </Box>
  );
};

export default UserInfo;
