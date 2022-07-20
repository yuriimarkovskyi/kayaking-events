import { Card, PageHeader } from 'antd';
import MyLayout from 'components/layout/MyLayout';
import Loader from 'components/Loader';
import { db } from 'config/firebase';
import { ref } from 'firebase/database';
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { useListVals } from 'react-firebase-hooks/database';
import { Link } from 'react-router-dom';
import { ICategory } from 'types';

function Categories() {
  const { Meta } = Card;

  const [categories, loading, error] = useListVals<ICategory>(ref(db, 'categories'));
  const [events] = useListVals<ICategory>(ref(db, 'events'));

  const filteredCategories = categories?.filter((category) => (
    events?.some((event) => (
      category.categoryName === event.categoryName
      && category.isPublished
      && event.isPublished
    ))
  ));

  if (loading) return <Loader />;
  if (error) console.error(error);

  return (
    <MyLayout>
      <PageHeader
        className="title"
        title="Категорії"
      />
      <Row className="cards-list">
        {filteredCategories?.map((filteredCategory) => (
          <Col key={filteredCategory.key} sm={12} lg={6} xl={4}>
            <Link to={`${filteredCategory.link}`}>
              <Card
                className="cards-list__item"
                hoverable
                cover={(
                  <img
                    src={filteredCategory.coverName}
                    alt={filteredCategory.categoryName}
                  />
                    )}
              >
                <Meta title={filteredCategory.categoryName} />
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </MyLayout>
  );
}

export default Categories;
