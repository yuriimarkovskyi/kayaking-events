import {
  Button, Form, Space, Steps,
} from 'antd';
import FirstStep from 'pages/Event/components/RegistrationForm/FirstStep';
import SecondStep from 'pages/Event/components/RegistrationForm/SecondStep';
import ThirdStep from 'pages/Event/components/RegistrationForm/ThirdStep';
import React, { useEffect, useState } from 'react';
import { ICustomer, IDate } from 'types';
import messageError from 'utils/messageError';

interface Props {
  eventName: string | undefined;
  data: ICustomer;
  dates: IDate[] | undefined;
  setData: (prevState: any) => void;
  closeModal: () => void;
}

function Stepper({
  eventName,
  data,
  dates,
  setData,
  closeModal,
}: Props) {
  const { Step } = Steps;
  const { useFormInstance } = Form;

  const form = useFormInstance();

  const [step, setStep] = useState(0);
  const [amount, setAmount] = useState(0);
  const [paymentStatus, setPaymentStatus] = useState('');

  useEffect(() => {
    if (paymentStatus === 'success') {
      form
        .validateFields()
        .then(() => {
          setData((prevState: any) => ({
            ...prevState,
            amount,
          }));
          form
            .resetFields();
          form
            .submit();

          setStep(0);

          closeModal();
        })
        .catch((err) => console.error(err));
    }

    if (paymentStatus === 'failure') {
      form.resetFields();
      setStep(0);

      messageError('Виникла помилка при оплаті, спробуйте зареєструватись повторно');

      closeModal();
    }
  }, [paymentStatus]);

  const steps = [
    {
      title: 'Перший крок',
      description: 'Персональні дані',
      content: <FirstStep />,
      controls: (
        <Button
          type="primary"
          onClick={() => {
            form
              .validateFields()
              .then((values) => {
                setData((prevState: any) => ({
                  ...prevState,
                  customerData: {
                    fullName: values.fullName,
                    email: values.email,
                    phone: values.phone,
                  },
                }));

                setStep(step + 1);
              })
              .catch((err) => console.error(err));
          }}
        >
          Далі
        </Button>
      ),
    },
    {
      title: 'Другий крок',
      description: 'Плавзасоби і спорядження',
      content: <SecondStep dates={dates} />,
      controls: (
        <Space>
          <Button
            type="primary"
            onClick={() => setStep(step - 1)}
          >
            Назад
          </Button>
          <Button
            type="primary"
            onClick={() => {
              form
                .validateFields()
                .then((values) => {
                  setData((prevState: any) => ({
                    ...prevState,
                    eventDate: values.eventDate,
                    boatsData: {
                      soloKayaks: values.soloKayaks,
                      doubleKayaks: values.doubleKayaks,
                      sups: values.sups,
                    },
                    equipmentData: {
                      childSeats: values.childSeats,
                      carbonPaddles: values.carbonPaddles,
                      neopreneSkirts: values.neopreneSkirts,
                      nylonSkirts: values.nylonSkirts,
                      waterproofCases: values.waterproofCases,
                    },
                    notes: values.notes || '',
                  }));

                  setStep(step + 1);
                })
                .catch((err) => console.error(err));
            }}
          >
            Далі
          </Button>
        </Space>
      ),
    },
    {
      title: 'Третій крок',
      description: 'Вартість і оплата',
      content: (
        <ThirdStep
          eventName={eventName}
          data={data}
          setAmount={setAmount}
          setPaymentStatus={setPaymentStatus}
        />
      ),
      controls: (
        <Button
          type="primary"
          onClick={() => setStep(step - 1)}
        >
          Назад
        </Button>
      ),
    },
  ];

  return (
    <>
      <Steps
        direction="vertical"
        current={step}
      >
        {steps.map((item) => (
          <Step
            key={item.title}
            title={item.title}
            description={item.description}
          />
        ))}
      </Steps>
      {steps[step].content}
      {steps[step].controls}
    </>
  );
}

export default Stepper;
