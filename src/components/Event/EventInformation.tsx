import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, List, Modal } from 'antd';
import Item from 'antd/es/list/Item';
import moment from 'moment';
import { useAppSelector } from 'hooks/useAppSelector';
import 'moment/locale/uk';
import RegistrationForm from './RegistrationForm';

function EventInformation() {
  const { link } = useParams();
  const [isVisible, setIsVisible] = useState(false);
  const events = useAppSelector((state) => state.events);

  const currentEvent = events.filter((el) => el.link === link);

  const showModal = () => setIsVisible(true);
  const closeModal = () => setIsVisible(false);

  return (
    <div className="event-information">
      {currentEvent.map((el) => (
        <div key={el.key}>
          <List
            size="small"
            header={(
              <span className="event-information__title">
                {`🤗 ${el.description}`}
              </span>
            )}
            dataSource={el.descriptionFeatures}
            renderItem={(item) => (
              <Item>
                {`🔹 ${item}`}
              </Item>
            )}
          />
          <List
            size="small"
            header={(
              <span className="event-information__title">
                💳 Вартість:
              </span>
            )}
            dataSource={el.price}
            renderItem={(item) => (
              <Item>
                {`${item.title} ${item.price} ГРН`}
              </Item>
            )}
          />
          <List
            size="small"
            header={(
              <span className="event-information__title">
                📆 Коли:
              </span>
            )}
            dataSource={el.dates}
            renderItem={(item) => (
              <Item className="event-information__dates">
                <span>
                  {`Дата - ${moment.unix(item.date).locale('uk').format('L')}`}
                </span>
                <span>
                  {`Вільних місць - ${item.freePlaces.soloKayaks + item.freePlaces.doubleKayaks}.`}
                </span>
                <ul key={item.instructor.key} className="event-information__dates-guide">
                  <li>
                    {`Гід - ${item.instructor.name}`}
                  </li>
                  <li>
                    <a href={item.instructor?.links?.facebook} target="_blank" rel="noreferrer">
                      <img src="https://img.icons8.com/officexs/16/undefined/facebook-new.png" alt="facebook-icon" />
                    </a>
                  </li>
                  <li>
                    <a href={item.instructor?.links?.instagram} target="_blank" rel="noreferrer">
                      <img src="https://img.icons8.com/officexs/16/undefined/instagram-new.png" alt="instagram-icon" />
                    </a>
                  </li>
                </ul>
              </Item>
            )}
          />
        </div>
      ))}
      <Button
        type="primary"
        htmlType="button"
        onClick={showModal}
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
        <RegistrationForm closeModal={closeModal} />
      </Modal>
    </div>
  );
}

export default EventInformation;
