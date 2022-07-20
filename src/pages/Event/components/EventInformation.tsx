import 'moment/locale/uk';

import {
  Alert, Button, Card, List, Modal, Space, Statistic, Typography,
} from 'antd';
import Item from 'antd/es/list/Item';
import { db } from 'config/firebase';
import { ref } from 'firebase/database';
import moment from 'moment';
import RegistrationForm from 'pages/Event/components/RegistrationForm/RegistrationForm';
import React, { useState } from 'react';
import { useListVals } from 'react-firebase-hooks/database';
import { useParams } from 'react-router-dom';
import { IDate, IEvent, IPriceBoats } from 'types';

function EventInformation() {
  const { link } = useParams();

  const { Title, Text } = Typography;

  const [isVisible, setIsVisible] = useState(false);

  const [events] = useListVals<IEvent>(ref(db, 'events'));
  const [dates] = useListVals<IDate>(ref(db, 'dates'));
  const [prices] = useListVals<IPriceBoats>(ref(db, 'prices/boats'));

  const currentEvent = events?.find((event) => event.link === link);
  const eventDates = dates?.filter((date) => date.eventName === currentEvent?.eventName);
  const eventPrice = prices?.filter((price) => price.eventName === currentEvent?.eventName);

  const freePlacesSummary = eventDates?.every((val) => (
    !val.freePlaces.soloKayaks
    && !val.freePlaces.doubleKayaks
    && !val.freePlaces.sups
  ));

  const showModal = () => setIsVisible(true);
  const closeModal = () => setIsVisible(false);

  return (
    <div className="event-information">
      <List
        size="small"
        header={(
          <Title level={5}>
            {`🤗 ${currentEvent?.description}`}
          </Title>
        )}
        dataSource={currentEvent?.features}
        renderItem={(feature) => (
          <Item>
            <Text>
              {`🔹 ${feature}`}
            </Text>
          </Item>
        )}
      />
      <List
        size="small"
        header={(
          <Title level={5}>
            💳 Вартість:
          </Title>
        )}
        dataSource={eventPrice}
        renderItem={(price) => (
          <Space wrap>
            {
              price.soloKayak
                ? (
                  <Card title="Одномісний каяк">
                    <Statistic
                      value={price.soloKayak}
                      suffix="ГРН"
                    />
                  </Card>
                )
                : null
            }
            {
              price.doubleKayak
                ? (
                  <Card title="Двомісний каяк">
                    <Statistic
                      value={price.doubleKayak}
                      suffix="ГРН"
                    />
                  </Card>
                )
                : null
            }
            {
              price.sup
                ? (
                  <Card title="Сап">
                    <Statistic
                      value={price.sup}
                      suffix="ГРН"
                    />
                  </Card>
                )
                : null
            }
          </Space>
        )}
      />
      <List
        size="small"
        header={(
          <Title level={5}>
            📆 Дати:
          </Title>
        )}
        dataSource={eventDates}
        renderItem={(item) => (
          <Item className="event-information">
            <ul className={`
              event-information__list
              ${!(item.freePlaces.soloKayaks
              + item.freePlaces.doubleKayaks
              + item.freePlaces.sups)
              ? 'isCompleted'
              : ''}
                `}
            >
              <li className="event-information__list-item">
                <Text italic>
                  Дата -
                </Text>
                {` ${moment.unix(item.date)
                  .locale('uk')
                  .format('L')}`}
              </li>
              <li className="event-information__list-item">
                <Text italic>
                  Вільних місць -
                </Text>
                {` ${item.freePlaces.soloKayaks
                + item.freePlaces.doubleKayaks
                + item.freePlaces.sups}`}
              </li>
              <li className="event-information__list-item">
                <Text italic>
                  Гід -
                </Text>
                {` ${item.instructor}`}
              </li>
            </ul>
            {
              !(item.freePlaces.soloKayaks
                + item.freePlaces.doubleKayaks
                + item.freePlaces.sups)
                ? (
                  <Alert
                    message="Вільних місць немає"
                    type="info"
                    showIcon
                  />
                )
                : null
            }
          </Item>
        )}
      />
      <Button
        type="primary"
        htmlType="button"
        onClick={showModal}
        disabled={freePlacesSummary}
        block
      >
        Реєстрація
      </Button>
      <Modal
        title="Форма реєстрації"
        centered
        footer={null}
        visible={isVisible}
        onCancel={closeModal}
      >
        <RegistrationForm
          eventName={currentEvent?.eventName}
          dates={eventDates}
          closeModal={closeModal}
        />
      </Modal>
    </div>
  );
}

export default EventInformation;
