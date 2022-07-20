import { message } from 'antd';

const messageSuccess = (content: string) => {
  message.success({
    content,
    duration: 5,
    style: {
      marginTop: '30vh',
    },
  });
};

export default messageSuccess;
