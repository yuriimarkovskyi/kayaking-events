import { Card, Layout, Typography } from 'antd';
import Loader from 'components/Loader';
import MyContent from 'components/UI/MyContent';
import MyFooter from 'components/UI/MyFooter';
import MyHeader from 'components/UI/MyHeader';
import { db } from 'config/firebase';
import { ref } from 'firebase/database';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useListVals } from 'react-firebase-hooks/database';
import { Link, useParams } from 'react-router-dom';
import { ICategory, IEvent } from 'types';

function Events() {
  const { link } = useParams();

  const { Title } = Typography;
  const { Meta } = Card;

  const [events, loading, error] = useListVals<IEvent>(ref(db, 'events'));
  const [categories] = useListVals<ICategory>(ref(db, 'categories'));

  const { categoryName } = categories?.find((category) => category.link === link) || {};
  const filteredEvents = events?.filter((event) => event.categoryName === categoryName);

  if (loading) return <Loader />;
  if (error) console.error(error);

  return (
    <Layout>
      <Container>
        <MyHeader />
        <MyContent>
          <Title className="title">
            Оберіть бажану подію
          </Title>
          <Row className="cards-list">
            {filteredEvents?.map((event) => (
              <Col key={event.key} sm={12} lg={6} xl={4}>
                <Link to={`../event/${event.link}`}>
                  <Card
                    className="cards-list__item"
                    hoverable
                    cover={(
                      <img
                        src={event.cover}
                        alt={event.title}
                      />
                    )}
                  >
                    <Meta title={event.eventName} />
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        </MyContent>
        <MyFooter />
      </Container>
    </Layout>
  );
}

export default Events;
