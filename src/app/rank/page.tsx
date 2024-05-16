'use client';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { getRecordPage } from '../lib/request/getRecordPage';
import { LEVEL } from '../lib/constants';
import { Table } from 'antd';
import RadioGroup from 'antd/es/radio/group';
import { LEVEL_NAME } from '../component/Game/constants';
import { Page } from './styled';

const Rank: React.FC = () => {
  const [level, setLevel] = useState<LEVEL>(1);
  const [current, setCurrent] = useState(1);

  const { data, isLoading } = useSWR(
    ['/api/rank/records', current, level],
    () => getRecordPage({ current, level })
  );
  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <Page>
      <RadioGroup
        value={`${level}`}
        onChange={e => {
          setLevel(e.target.value);
        }}
        optionType="button"
        buttonStyle="solid"
        options={Object.entries(LEVEL_NAME).map(([k, v]) => {
          return {
            value: k,
            label: v,
            key: k
          };
        })}
      />
      <Table
        loading={isLoading}
        dataSource={data?.data}
        pagination={{
          total: data?.total,
          current,

          onChange: setCurrent
        }}
        rowKey="id"
        columns={[
          {
            title: '排名',
            dataIndex: 'rank',
            key: 'rank'
          },
          {
            title: '用户',
            dataIndex: ['user', 'name'],
            key: 'username'
          },
          {
            title: '时间',
            dataIndex: 'time',
            key: 'time',
            render: (text: number) => `${text / 1000}秒`
          }
        ]}
      />
    </Page>
  );
};

export default Rank;
