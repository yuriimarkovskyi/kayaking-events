import { Card, PageHeader } from 'antd';
import MyLayout from 'components/layout/MyLayout';
import Loader from 'components/Loader';
import { db } from 'config/firebase';
import { ref } from 'firebase/database';
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { useListVals } from 'react-firebase-hooks/database';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ICategory, IEvent } from 'types';

function Events() {
  const { link } = useParams();
  const navigate = useNavigate();

  const { Meta } = Card;

  const [events, loading, error] = useListVals<IEvent>(ref(db, 'events'));
  const [categories] = useListVals<ICategory>(ref(db, 'categories'));

  const { categoryName } = categories?.find((category) => category.link === link) || {};

  if (loading) return <Loader />;
  if (error) console.error(error);

  return (
    <MyLayout>
      <PageHeader
        className="title"
        onBack={() => navigate(-1)}
        title="Події"
        subTitle={categoryName}
      />
      <Row className="cards-list">
        {events
          ?.filter((event) => event.categoryName === categoryName && event.isPublished)
          .map((filteredEvent) => (
            <Col key={filteredEvent.key} sm={12} lg={6} xl={4}>
              <Link to={`../event/${filteredEvent.link}`}>
                <Card
                  className="cards-list__item"
                  hoverable
                  cover={(
                    <img
                      src={filteredEvent.cover}
                      alt={filteredEvent.title}
                    />
                    )}
                >
                  <Meta title={filteredEvent.eventName} />
                </Card>
              </Link>
            </Col>
          ))}
      </Row>
    </MyLayout>
  );
}

export default Events;
