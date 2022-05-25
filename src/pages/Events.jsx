import React from 'react';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import { Card, Layout, Typography } from 'antd';

function Events() {
  const { Title } = Typography;
  const { Meta } = Card;
  const { Content } = Layout;

  const events = useSelector((state) => state.events);

  return (
    <Container>
      <Helmet>
        <title>
          Список івентів
        </title>
      </Helmet>

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
