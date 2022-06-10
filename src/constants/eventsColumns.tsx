import type { ColumnsType } from 'antd/lib/table';
import { IEvent } from 'types';

const eventsColumns: ColumnsType<IEvent> = [
  {
    title: 'Івент',
    dataIndex: 'eventName',
  },
  {
    title: 'Лінк',
    dataIndex: 'link',
  },
  {
    title: 'Заголовок',
    dataIndex: 'title',
  },
  {
    title: 'Опис',
    dataIndex: 'description',
  },
  {
    title: 'Обкладинка',
    dataIndex: 'imageCover',
  },
  {
    title: 'Фото для слайдеру',
    dataIndex: 'imagesSlider',
  },
  {
    title: 'Ключові особливості',
    dataIndex: 'descriptionFeatures',
  },
];

export { eventsColumns };
