'use client';

import { GetProp, Layout, Menu, MenuProps, theme } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content, Header } from 'antd/es/layout/layout';
import MenuItem from 'antd/es/menu/MenuItem';
import { usePathname, useRouter } from 'next/navigation';
import { PropsWithChildren } from 'react';

import { SessionProvider } from 'next-auth/react';
import { User } from '../User';

type MenuItem = GetProp<MenuProps, 'items'>[number];
const MenuItems: MenuItem[] = [
  {
    key: '/',
    label: '游戏'
  },
  {
    key: '/rank',
    label: '排行榜'
  }
];

export const Page: React.FC<PropsWithChildren> = ({ children }) => {
  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken();
  const { push } = useRouter();
  const pathname = usePathname();
  return (
    <SessionProvider>
      <Layout
        style={{
          minHeight: '100vh'
        }}
      >
        <Header
          style={{
            backgroundColor: colorBgContainer,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <div>扫雷</div>
          <User />
        </Header>
        <Layout
          style={{
            maxWidth: '1200px',
            width: '100%',
            margin: '24px auto'
          }}
        >
          <Sider
            style={{
              backgroundColor: colorBgContainer
            }}
          >
            <Menu
              items={MenuItems}
              selectedKeys={[pathname]}
              theme="light"
              style={{
                height: '100%'
              }}
              onSelect={({ key }) => {
                push(key);
              }}
            />
          </Sider>
          <Layout
            style={{
              padding: '0 24px 24px',
              backgroundColor: colorBgContainer
            }}
          >
            <Content>{children}</Content>
          </Layout>
        </Layout>
      </Layout>
    </SessionProvider>
  );
};
