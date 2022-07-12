import 'moment/locale/uk';

import {
  Alert, Button, List, Modal,
} from 'antd';
import Item from 'antd/es/list/Item';
import RegistrationForm from 'components/Forms/RegistrationForm/RegistrationForm';
import { db } from 'config/firebase';
import { ref } from 'firebase/database';
import moment from 'moment';
import React, { useState } from 'react';
import { useListVals } from 'react-firebase-hooks/database';
import { useParams } from 'react-router-dom';
import { IDate, IEvent, IPriceBoats } from 'types';

function EventInformation() {
  const { link } = useParams();

  const [isVisible, setIsVisible] = useState(false);

  const [events] = useListVals<IEvent>(ref(db, 'events'));
  const [dates] = useListVals<IDate>(ref(db, 'dates'));
  const [prices] = useListVals<IPriceBoats>(ref(db, 'prices/boats'));

  const currentEvent = events?.find((event) => event.link === link);
  const eventDates = dates?.filter((date) => date.eventName === currentEvent?.eventName);
  const eventPrice = prices?.find((price) => price.eventName === currentEvent?.eventName);
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
          <h3 className="event-information__title">
            {`🤗 ${currentEvent?.description}`}
          </h3>
          )}
        dataSource={currentEvent?.features}
        renderItem={(item) => (
          <Item>
            <span>
              {`🔹 ${item}`}
            </span>
          </Item>
        )}
      />
      <List
        size="small"
        header={(
          <h3 className="event-information__title">
            💳 Вартість:
          </h3>
        )}
        renderItem={() => (
          <Item>
            <ul className="event-information__list">
              {
                eventPrice?.soloKayak && (
                <li className="event-information__list-item">
                  <span>
                    Одномісний каяк -
                  </span>
                  {` ${eventPrice?.soloKayak} ГРН`}
                </li>
                )
              }
              {
                eventPrice?.doubleKayak && (
                <li className="event-information__list-item">
                  <span>
                    Двомісний каяк -
                  </span>
                  {` ${eventPrice?.doubleKayak} ГРН`}
                </li>
                )
              }
              {
                eventPrice?.sup && (
                <li className="event-information__list-item">
                  <span>
                    Сап -
                  </span>
                  {` ${eventPrice?.sup} ГРН`}
                </li>
                )
              }
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
                {` ${item.freePlaces.soloKayaks
                + item.freePlaces.doubleKayaks
                + item.freePlaces.sups}`}
              </li>
              <li className="event-information__list-item">
                <span>
                  Гід -
                </span>
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
