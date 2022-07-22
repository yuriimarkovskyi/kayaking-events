import useScript from 'hooks/useScript';
import moment from 'moment';
import React, { useEffect } from 'react';
import { ICustomer, IPaymentPayload } from 'types';
import paymentDataEncode from 'utils/paymentDataEncode';

interface Props {
  amount: number,
  data: ICustomer,
  setPaymentStatus: (status: string) => void,
  setIsPaymentLoaded: (isLoaded: boolean) => void,
}

interface IWidgetData {
  data: string;
  signature: string;
  embedTo: string;
  mode: string;
  language: string;
}

function PaymentWidget({
  amount,
  data,
  setPaymentStatus,
  setIsPaymentLoaded,
}: Props) {
  const { fullName } = data.customerData;
  const {
    key,
    eventName,
    eventDate,
  } = data;
  const description = `
  ${fullName}, ${eventName}, ${moment.unix(eventDate)
  .locale('uk')
  .format('L')}
    `;

  const payload: IPaymentPayload = {
    version: 3,
    public_key: process.env.REACT_APP_LIQPAY_PUBLIC_KEY,
    action: 'pay',
    amount,
    currency: 'UAH',
    description,
    order_id: key,
  };

  const [paymentData, signature] = paymentDataEncode(payload);

  const widgetData: IWidgetData = {
    data: paymentData,
    signature,
    embedTo: '#checkout',
    mode: 'embed',
    language: 'uk',
  };

  useScript('https://static.liqpay.ua/libjs/checkout.js');

  useEffect(() => {
    window.LiqPayCheckoutCallback = (): void => {
      window.LiqPayCheckout.init(widgetData)
        .on('liqpay.callback', (res: any) => {
          setPaymentStatus(res.status);
        })
        .on('liqpay.ready', (res: any) => {
          if (res.cmd === 'liqpay.ready') {
            setIsPaymentLoaded(true);
          }
        });
    };
  }, [amount]);

  return (
    <div id="checkout" />
  );
}

export default PaymentWidget;
