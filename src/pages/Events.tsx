import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import { Card, Layout, Typography } from 'antd';
import { useAppSelector } from '../hooks/useAppSelector';

function Events(): JSX.Element {
  const { Title } = Typography;
  const { Meta } = Card;
  const { Content } = Layout;

  const events = useAppSelector((state) => state.events);

  return (
    <Container>
      <Layout>
        <Content>
          <Title className="title" level={2}>
            Оберіть івент, на який бажаєте зареєструватись
          </Title>
          <Row className="events">
            {events.map((event) => (
              <Col key={event.id} sm={12} lg={6} xl={4}>
                <Link to={`event/${event.link}`}>
                  <Card
                    hoverable
                    cover={<img src={event.imageCover} alt={event.name} />}
                  >
                    <Meta title={event.title} />
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        </Content>
      </Layout>
    </Container>
  );
}

export default Events;
