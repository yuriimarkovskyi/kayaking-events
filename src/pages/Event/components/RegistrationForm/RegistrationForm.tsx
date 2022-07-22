import 'moment/locale/uk';

import { Form } from 'antd';
import Stepper from 'pages/Event/components/RegistrationForm/Stepper';
import React, { useState } from 'react';
import { ICustomer, IDate } from 'types';
import { pushDataToDb } from 'utils/dbActions';
import messageSuccess from 'utils/messageSuccess';
import validationMessages from 'utils/validationMessages';

interface Props {
  eventName: string | undefined;
  dates: IDate[] | undefined;
  closeModal: () => void;
}

function RegistrationForm({
  eventName,
  dates,
  closeModal,
}: Props) {
  const { useForm } = Form;

  const [form] = useForm();

  const [data, setData] = useState<ICustomer>({
    key: Date.now(),
    registrationTime: Date.now(),
    eventName: eventName!,
    eventDate: 0,
    customerData: {
      fullName: '',
      email: '',
      phone: '',
    },
    boatsData: {
      soloKayaks: 0,
      doubleKayaks: 0,
      sups: 0,
    },
    equipmentData: {
      childSeats: 0,
      carbonPaddles: 0,
      neopreneSkirts: 0,
      nylonSkirts: 0,
      waterproofCases: 0,
    },
    amount: 0,
    notes: '',
    isCompleted: false,
    isRejected: false,
    rejectedReason: '',
  });

  const onFinish = () => {
    pushDataToDb('registrations', data)
      .then(() => messageSuccess('Реєстрація пройшла успішно'));
  };

  return (
    <Form
      className="registration-form form"
      name="registration-form"
      layout="vertical"
      form={form}
      validateMessages={validationMessages}
      onFinish={onFinish}
    >
      <Stepper
        eventName={eventName}
        data={data}
        dates={dates}
        setData={setData}
        closeModal={closeModal}
      />
    </Form>
  );
}

export default RegistrationForm;
