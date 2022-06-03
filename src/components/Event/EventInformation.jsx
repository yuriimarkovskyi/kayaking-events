import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  Button, Divider, List, Modal,
} from 'antd';
import Item from 'antd/es/list/Item';
import moment from 'moment';
import 'moment/locale/uk';
import facebookIcon from '../../images/icons/facebook.png';
import instagramIcon from '../../images/icons/instagram.png';
import { changeVisibility } from '../../store/visibilitySlice';
import RegistrationForm from './RegistrationForm';

function EventInformation() {
  const dispatch = useDispatch();
  const { link } = useParams();

  const isVisible = useSelector((state) => state.visibility);
  const events = useSelector((state) => state.events);
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
              <>
                <Item className="event-information__dates">
                  <span>
                    {`Дата - ${moment.unix(item.date).locale('uk').format('L')}`}
                  </span>
                  <span>
                    {`Вільних місць - ${item.freePlaces.soloKayaks + item.freePlaces.doubleKayaks}.`}
                  </span>
                  {item.guide.map((guide) => (
                    <ul key={guide.id} className="event-information__dates-guide">
                      <li>
                        {`Гід - ${guide.name}`}
                      </li>
                      <li>
                        <a href={guide.links.facebook} target="_blank" rel="noreferrer">
                          <img src={facebookIcon} alt="" />
                        </a>
                      </li>
                      <li>
                        <a href={guide.links.instagram} target="_blank" rel="noreferrer">
                          <img src={instagramIcon} alt="" />
                        </a>
                      </li>
                    </ul>
                  ))}
                </Item>
                <Divider />
              </>
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
