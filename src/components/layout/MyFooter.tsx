import { Layout } from 'antd';
import React from 'react';
import { Container } from 'react-bootstrap';

function MyFooter() {
  const { Footer } = Layout;

  return (
    <Footer>
      <Container>
        ©2022 kayaking-events
      </Container>
    </Footer>
  );
}

export default MyFooter;
