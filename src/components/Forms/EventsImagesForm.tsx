import { UploadOutlined } from '@ant-design/icons';
import {
  Button, Form, message, Upload,
} from 'antd';
import { storage } from 'config/firebase';
import { ref, uploadBytes } from 'firebase/storage';
import React from 'react';

interface Props {
  closeDrawer: () => void;
}

function EventsImagesForm({ closeDrawer }: Props) {
  const [form] = Form.useForm();

  // const coverEvent = (e: any) => e.file;
  const sliderImagesEvent = (e: any) => e.fileList;

  const onFinish = (values: any) => {
    const {
      cover,
      // sliderImages,
    } = values;

    const coverRef = ref(storage, `images/covers/${cover.name}`);

    form.resetFields();

    uploadBytes(coverRef, cover);
    // uploadBytes(sliderImages);

    message.success({
      content: 'Зображення додані',
      duration: 3,
      style: {
        marginTop: '30vh',
      },
    });

    closeDrawer();
  };

  return (
    <Form
      id="events-form"
      className="form"
      form={form}
      layout="vertical"
      name="events-form"
      onFinish={onFinish}
    >
      {/* <Form.Item */}
      {/*   name="cover" */}
      {/*   label="Обкладинка:" */}
      {/*   valuePropName="file" */}
      {/*   getValueFromEvent={coverEvent} */}
      {/*   tooltip="Доступні формати: png, jpg, jpeg. Розмір файлу не може бути більше 2 мб" */}
      {/*   rules={[ */}
      {/*     { */}
      {/*       required: true, */}
      {/*       message: 'Необхідно завантажити обкладинку', */}
      {/*     }, */}
      {/*   ]} */}
      {/* > */}
      {/*   <Upload */}
      {/*     accept=".png, .jpg, .jpeg" */}
      {/*     maxCount={1} */}
      {/*     listType="picture" */}
      {/*     beforeUpload={(file) => { */}
      {/*       const allowedExtensions = file.type === 'image/png' */}
      {/*         || file.type === 'image/jpg' */}
      {/*         || file.type === 'image/jpeg'; */}
      {/*       if (!allowedExtensions) { */}
      {/*         message.error('Завантажте зображення з коректним розширенням'); */}

      {/*         return Upload.LIST_IGNORE; */}
      {/*       } */}
      {/*       const maxFileSize = file.size / 1024 / 1024 < 2; */}
      {/*       if (!maxFileSize) { */}
      {/*         message.error('Розмір файлу не може бути більше 2 мб'); */}

      {/*         return Upload.LIST_IGNORE; */}
      {/*       } */}
      {/*       return false; */}
      {/*     }} */}
      {/*   > */}
      {/*     <Button icon={<UploadOutlined />}> */}
      {/*       Завантажити */}
      {/*     </Button> */}
      {/*   </Upload> */}
      {/* </Form.Item> */}
      <Form.Item
        name="sliderImages"
        label="Зображення для слайдеру:"
        valuePropName="fileList"
        getValueFromEvent={sliderImagesEvent}
        tooltip="Доступні формати: png, jpg, jpeg. Розмір одного файлу не може бути більше 2 мб"
        rules={[
          {
            required: true,
            message: 'Необхідно завантажити зображення для слайдеру',
          },
        ]}
      >
        <Upload
          accept=".png, .jpg, .jpeg"
          maxCount={7}
          listType="picture"
          multiple
          beforeUpload={(file, fileList) => {
            const allowedExtensions = file.type === 'image/png'
              || file.type === 'image/jpg'
              || file.type === 'image/jpeg';
            if (!allowedExtensions) {
              message.error('Завантажте зображення з коректним розширенням');

              return Upload.LIST_IGNORE;
            }
            const maxFileSize = file.size / 1024 / 1024 < 2;
            if (!maxFileSize) {
              message.error('Розмір файлу не може бути більше 2 мб');

              return Upload.LIST_IGNORE;
            }
            if (fileList.length < 2) {
              message.error('Необхідно завантажити мінімум 4 зображення');

              return Upload.LIST_IGNORE;
            }
            if (fileList.length > 7) {
              message.error('Можна завантажити максимум 7 зображень');

              return Upload.LIST_IGNORE;
            }
            return false;
          }}
        >
          <Button icon={<UploadOutlined />}>
            Завантажити
          </Button>
        </Upload>
      </Form.Item>
    </Form>
  );
}

export default EventsImagesForm;
