import { Button, Form, Steps } from 'antd';
import FirstStep from 'components/Forms/RegistrationForm/FirstStep';
import SecondStep from 'components/Forms/RegistrationForm/SecondStep';
import ThirdStep from 'components/Forms/RegistrationForm/ThirdStep';
import React, { useState } from 'react';
import { ICustomer, IDate } from 'types';

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

  const steps = [
    {
      title: 'Перший крок',
      description: 'Персональні дані',
      content: <FirstStep />,
      controls: (
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
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
        </div>
      ),
    },
    {
      title: 'Другий крок',
      description: 'Плавзасоби і спорядження',
      content: <SecondStep dates={dates} />,
      controls: (
        <div style={{ display: 'flex', justifyContent: 'flex-end', columnGap: '10px' }}>
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
        </div>
      ),
    },
    {
      title: 'Третій крок',
      description: 'Вартість і нотатки',
      content: (
        <ThirdStep
          eventName={eventName}
          data={data}
          setAmount={setAmount}
        />
      ),
      controls: (
        <div style={{ display: 'flex', justifyContent: 'flex-end', columnGap: '10px' }}>
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
            }}
          >
            Реєстрація
          </Button>
        </div>
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
      <div className="steps-content">
        {steps[step].content}
      </div>
      <div className="steps-action">
        {steps[step].controls}
      </div>
    </>
  );
}

export default Stepper;
