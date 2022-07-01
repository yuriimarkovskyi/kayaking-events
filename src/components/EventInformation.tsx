import 'moment/locale/uk';

import { Button, List, Modal } from 'antd';
import Item from 'antd/es/list/Item';
import { db } from 'config/firebase';
import { ref } from 'firebase/database';
import moment from 'moment';
import React, { useState } from 'react';
import { useListVals } from 'react-firebase-hooks/database';
import { useParams } from 'react-router-dom';
import { IDate, IEvent, IPriceBoats } from 'types';

import RegistrationForm from './Forms/RegistrationForm';

function EventInformation() {
  const { link } = useParams();

  const [isVisible, setIsVisible] = useState(false);

  const [events] = useListVals<IEvent>(ref(db, 'events'));
  const [dates] = useListVals<IDate>(ref(db, 'dates'));
  const [prices] = useListVals<IPriceBoats>(ref(db, 'prices'));

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
                {` ${item.soloKayaks} ГРН`}
              </li>
              <li className="event-information__list-item">
                <span>
                  Двомісний каяк -
                </span>
                {` ${item.doubleKayaks} ГРН`}
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
            <ul className={`
              event-information__list
              ${!(item.freePlaces.soloKayaks + item.freePlaces.doubleKayaks + item.freePlaces.sups)
              ? 'isCompleted'
              : ''}
                `}
            >
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
        disabled={!eventDates?.length}
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
          // closeModal={closeModal}
        />
      </Modal>
    </div>
  );
}

export default EventInformation;
