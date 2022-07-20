import { btoa, encode } from 'js-base64';
import { IPaymentPayload } from 'types';

const sha1 = require('sha1');

const privateKey = process.env.REACT_APP_LIQPAY_PRIVATE_KEY;

const paymentDataEncode = (payload: IPaymentPayload) => {
  const paymentData = encode(JSON.stringify(payload));
  const signString = privateKey + paymentData + privateKey;
  const signature = btoa(sha1(signString)
    .match(/\w{2}/g)
    .map((a: string) => String.fromCharCode(parseInt(a, 16)))
    .join(''));

  return [paymentData, signature];
};

export default paymentDataEncode;
