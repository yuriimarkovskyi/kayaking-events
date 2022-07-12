import { Layout } from 'antd';
import React, { ReactNode } from 'react';

interface Props {
  centered?: boolean;
  children: ReactNode;
}

function MyContent({ centered = false, children }: Props) {
  const { Content } = Layout;

  return (
    <Content className={`content ${centered ? 'centered' : ''}`}>
      {children}
    </Content>
  );
}

export default MyContent;
