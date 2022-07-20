import { Layout } from 'antd';
import React, { ReactNode } from 'react';
import { Container } from 'react-bootstrap';

interface Props {
  fluidContent?: boolean;
  centeredContent?: boolean;
  children: ReactNode;
}

function MyContent({ fluidContent, centeredContent, children }: Props) {
  const { Content } = Layout;

  return (
    <Content className={`content ${centeredContent ? 'centered' : ''}`}>
      <Container fluid={fluidContent}>
        {children}
      </Container>
    </Content>
  );
}

export default MyContent;
