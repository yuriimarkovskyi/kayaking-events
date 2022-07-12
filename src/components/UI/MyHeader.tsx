import { Layout } from 'antd';
import React from 'react';

function MyHeader() {
  const { Header } = Layout;

  return (
    <Header className="header">
      Logo
      Language
    </Header>
  );
}

export default MyHeader;
