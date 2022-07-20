import { message } from 'antd';

const messageError = (content: string) => {
  message.error({
    content,
    duration: 5,
    style: {
      marginTop: '30vh',
    },
  });
};

export default messageError;
