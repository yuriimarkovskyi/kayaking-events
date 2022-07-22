import { CheckOutlined, CloseOutlined, UploadOutlined } from '@ant-design/icons';
import {
  Button, Form, Input, message, Switch, Upload,
} from 'antd';
import { storage } from 'config/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React from 'react';
import { ICategory } from 'types';
import { pushDataToDb } from 'utils/dbActions';
import messageSuccess from 'utils/messageSuccess';
import validationMessages from 'utils/validationMessages';

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
    const modifiedLink = values.link.replace(/\s/g, '');

    const category: ICategory = {
      key: Date.now(),
      categoryName: values.categoryName,
      link: modifiedLink,
      coverName: '',
      isPublished: values.isPublished,
    };

    const coverRef = ref(storage, `images/categories/covers/${modifiedLink}/${values.categoryName}`);

    await uploadBytes(coverRef, values.cover)
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
      validateMessages={validationMessages}
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
        name="isPublished"
        label="Опубліковано:"
        valuePropName="checked"
        initialValue
      >
        <Switch
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
        />
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
