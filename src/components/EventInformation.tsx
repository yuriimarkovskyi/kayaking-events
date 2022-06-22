import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, List, Modal } from 'antd';
import Item from 'antd/es/list/Item';
import moment from 'moment';
import 'moment/locale/uk';
import { useListVals } from 'react-firebase-hooks/database';
import { ref } from 'firebase/database';
import { IDate, IEvent, IPrice } from 'types';
import { db } from 'config/firebase';
import RegistrationForm from './Forms/RegistrationForm';

function EventInformation() {
  const { link } = useParams();

  const [isVisible, setIsVisible] = useState(false);

  const [events] = useListVals<IEvent>(ref(db, 'events'));
  const [dates] = useListVals<IDate>(ref(db, 'dates'));
  const [prices] = useListVals<IPrice>(ref(db, 'prices'));

  const currentEvent = events?.filter((event) => event.link === link);
  const eventDates = dates?.filter((date) => (
    currentEvent?.find((val) => val.eventName === date.eventName)
  ));
  const eventPrice = prices?.filter((price) => (
    currentEvent?.find((event) => event.eventName === price.eventName)
  ));

  const showModal = () => setIsVisible(true);
  const closeModal = () => setIsVisible(false);

  return (
    <div className="event-information">
      {currentEvent?.map((val) => (
        <List
          key={val.key}
          size="small"
          header={(
            <h3 className="event-information__title">
              {`🤗 ${val.description}`}
            </h3>
          )}
          dataSource={val.features}
          renderItem={(item) => (
            <Item>
              <span>
                {`🔹 ${item}`}
              </span>
            </Item>
          )}
        />
      ))}
      <List
        size="small"
        header={(
          <h3 className="event-information__title">
            💳 Вартість:
          </h3>
        )}
        dataSource={eventPrice}
        renderItem={(item) => (
          <Item>
            <ul className="event-information__list">
              <li className="event-information__list-item">
                <span>
                  Одномісний каяк -
                </span>
                {` ${item.soloKayak} ГРН`}
              </li>
              <li className="event-information__list-item">
                <span>
                  Двомісний каяк -
                </span>
                {` ${item.doubleKayak} ГРН`}
              </li>
            </ul>
          </Item>
        )}
      />
      <List
        size="small"
        header={(
          <h3 className="event-information__title">
            📆 Дати:
          </h3>
        )}
        dataSource={eventDates}
        renderItem={(item) => (
          <Item>
            <ul className="event-information__list">
              <li className="event-information__list-item">
                <span>
                  Дата -
                </span>
                {` ${moment.unix(item.date)
                  .locale('uk')
                  .format('L')}`}
              </li>
              <li className="event-information__list-item">
                <span>
                  Вільних місць -
                </span>
                {` ${item.freePlaces.soloKayaks + item.freePlaces.doubleKayaks}`}
              </li>
              <li className="event-information__list-item">
                <span>
                  Гід -
                </span>
                {` ${item.instructor}`}
              </li>
            </ul>
          </Item>
        )}
      />
      <Button
        type="primary"
        htmlType="button"
        onClick={showModal}
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
          currentEvent={currentEvent}
          dates={eventDates}
          price={eventPrice}
          closeModal={closeModal}
        />
      </Modal>
    </div>
  );
}

export default EventInformation;
