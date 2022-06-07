import React from 'react';
import { useParams } from 'react-router-dom';
import { Button, List, Modal } from 'antd';
import Item from 'antd/es/list/Item';
import moment from 'moment';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import 'moment/locale/uk';
// @ts-ignore
import facebookIcon from '../../images/icons/facebook.png';
// @ts-ignore
import instagramIcon from '../../images/icons/instagram.png';
import { changeVisibility } from '../../store/visibilitySlice';
import RegistrationForm from './RegistrationForm';

function EventInformation(): JSX.Element {
  const { link } = useParams();
  const dispatch = useAppDispatch();

  const isVisible = useAppSelector((state) => state.visibility);
  const events = useAppSelector((state) => state.events);
  const currentEvent = events.filter((el) => el.link === link);

  const showModal = () => {
    dispatch(changeVisibility());
  };

  const closeModal = () => {
    dispatch(changeVisibility());
  };

  return (
    <div className="event-information">
      {currentEvent.map((el) => (
        <div key={el.id}>
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
                      <img src={facebookIcon} alt="" />
                    </a>
                  </li>
                  <li>
                    <a href={item.instructor?.links?.instagram} target="_blank" rel="noreferrer">
                      <img src={instagramIcon} alt="" />
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
        width="500"
        footer={null}
        visible={isVisible}
        onCancel={closeModal}
      >
        <RegistrationForm />
      </Modal>
    </div>
  );
}

export default EventInformation;
