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
import { Link } from 'react-router-dom';
import { ICategory } from 'types';

function Categories() {
  const { Title } = Typography;
  const { Meta } = Card;

  const [categories, loading, error] = useListVals<ICategory>(ref(db, 'categories'));

  if (loading) return <Loader />;
  if (error) console.error(error);

  return (
    <Layout>
      <Container>
        <MyHeader />
        <MyContent>
          <Title className="title">
            Оберіть бажану категорію
          </Title>
          <Row className="cards-list">
            {categories?.map((category) => (
              <Col key={category.key} sm={12} lg={6} xl={4}>
                <Link to={`events/${category.link}`}>
                  <Card
                    className="cards-list__item"
                    hoverable
                    cover={(
                      <img
                        src={category.coverName}
                        alt={category.categoryName}
                      />
                    )}
                  >
                    <Meta title={category.categoryName} />
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

export default Categories;
