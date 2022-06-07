import React from 'react';
import { Container } from 'react-bootstrap';
import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';

function NoMatch(): JSX.Element {
  return (
    <Container>
      <Result
        status="404"
        title="404"
        subTitle="Сторінки не існує"
        extra={(
          <Link to="/">
            <Button type="primary">
              На головну
            </Button>
          </Link>
        )}
      />
    </Container>

  );
}

export default NoMatch;
