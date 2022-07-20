import { UploadOutlined } from '@ant-design/icons';
import {
  Button, Form, Input, message, Upload,
} from 'antd';
import { storage } from 'config/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React from 'react';
import { ICategory } from 'types';
import { pushDataToDb } from 'utils/dbActions';
import messageSuccess from 'utils/messageSuccess';
import validateMessages from 'utils/validateMessages';

interface Props {
  closeDrawer: () => void;
}

function CategoriesForm({ closeDrawer }: Props) {
  const {
    useForm,
    Item,
  } = Form;
  const [form] = useForm();

  const coverEvent = (e: any) => e.file;

  const onFinish = async (values: any) => {
    const {
      categoryName,
      link,
      cover,
    } = values;

    const modifiedLink = link.replace(/\s/g, '');

    const category: ICategory = {
      key: Date.now(),
      categoryName,
      link: modifiedLink,
      coverName: '',
      isPublished: false,
    };

    const coverRef = ref(storage, `images/categories/covers/${modifiedLink}/${categoryName}`);

    await uploadBytes(coverRef, cover)
      .then(() => (getDownloadURL(coverRef)
        .then((url) => {
          category.coverName = url;
        }))
        .catch((err) => {
          console.error(err);
        }))
      .catch((err) => {
        console.error(err);
      });

    form.resetFields();
    pushDataToDb('categories', category)
      .then(() => messageSuccess('Категорія додана'));
    closeDrawer();
  };

  return (
    <Form
      id="categories-form"
      className="form"
      name="categories-form"
      layout="vertical"
      form={form}
      validateMessages={validateMessages}
      onFinish={onFinish}
    >
      <Item
        name="categoryName"
        label="Назва категорії:"
        rules={[
          { required: true },
          { whitespace: true },
          { min: 4 },
          { max: 40 },
          { pattern: /[А-Яа-яїЇ]/ },
        ]}
      >
        <Input />
      </Item>
      <Item
        name="link"
        label="Лінк:"
        rules={[
          { required: true },
          { whitespace: true },
          { min: 4 },
          { max: 25 },
          { pattern: /[A-Za-z]/ },
        ]}
      >
        <Input addonBefore="category/" />
      </Item>
      <Item
        name="cover"
        label="Обкладинка:"
        valuePropName="file"
        getValueFromEvent={coverEvent}
        tooltip="Доступні формати: png, jpg, jpeg. Розмір файлу не має перевищувати 2 мб"
        rules={[
          {
            required: true,
            message: 'Необхідно завантажити обкладинку',
          },
        ]}
      >
        <Upload
          accept=".png, .jpg, .jpeg"
          maxCount={1}
          listType="picture"
          beforeUpload={(file) => {
            const allowedExtensions = file.type === 'image/png'
              || file.type === 'image/jpg'
              || file.type === 'image/jpeg';

            if (!allowedExtensions) {
              message.error('Доступні формати: png, jpg, jpeg');

              return Upload.LIST_IGNORE;
            }

            const maxFileSize = file.size / 1024 / 1024 < 2;

            if (!maxFileSize) {
              message.error('Розмір файлу не має перевищувати 2 мб');

              return Upload.LIST_IGNORE;
            }
            return false;
          }}
        >
          <Button icon={<UploadOutlined />}>
            Завантажити
          </Button>
        </Upload>
      </Item>
    </Form>
  );
}

export default CategoriesForm;
