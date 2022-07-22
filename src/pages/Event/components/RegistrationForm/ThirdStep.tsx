import { Card, Statistic } from 'antd';
import Loader from 'components/Loader';
import { db } from 'config/firebase';
import { ref } from 'firebase/database';
import PaymentWidget from 'pages/Event/components/RegistrationForm/PaymentWidget';
import React, { useEffect, useState } from 'react';
import { useListVals } from 'react-firebase-hooks/database';
import { ICustomer, IPriceBoats, IPriceEquipment } from 'types';
import priceCalculation from 'utils/priceCalculation';

interface Props {
  eventName: string | undefined;
  data: ICustomer;
  setAmount: (amount: number) => void;
  setPaymentStatus: (status: string) => void;
}

function ThirdStep({
  eventName,
  data,
  setAmount,
  setPaymentStatus,
}: Props) {
  const [pricesBoats] = useListVals<IPriceBoats>(ref(db, 'prices/boats'));
  const [pricesEquipment] = useListVals<IPriceEquipment>(ref(db, 'prices/equipment'));

  const [isPaymentLoaded, setIsPaymentLoaded] = useState(false);

  const {
    soloKayak: priceSoloKayak,
    doubleKayak: priceDoubleKayak,
    sup: priceSup,
  } = pricesBoats?.find((price) => price.eventName === eventName) || {};
  const {
    childSeat: priceChildSeat,
    carbonPaddle: priceCarbonPaddle,
    neopreneSkirt: priceNeopreneSkirt,
    nylonSkirt: priceNylonSkirt,
    waterproofCase: priceWaterproofCase,
  } = pricesEquipment?.[0] || {};

  const amount = priceCalculation(
    priceSoloKayak!,
    data.boatsData.soloKayaks,
    priceDoubleKayak!,
    data.boatsData.doubleKayaks,
    priceSup!,
    data.boatsData.sups,
    priceChildSeat!,
    data.equipmentData.childSeats,
    priceCarbonPaddle!,
    data.equipmentData.carbonPaddles,
    priceNeopreneSkirt!,
    data.equipmentData.neopreneSkirts,
    priceNylonSkirt!,
    data.equipmentData.nylonSkirts,
    priceWaterproofCase!,
    data.equipmentData.waterproofCases,
  );

  useEffect(() => {
    setAmount(amount);
  }, [amount]);

  return (
    <>
      {
        !isPaymentLoaded
          ? <Loader />
          : (
            <div className="registration-form__cards">
              <Card
                title="Плавзасоби:"
                size="small"
                bodyStyle={{
                  display: 'flex',
                  flexDirection: 'column',
                  rowGap: '15px',
                }}
              >
                {
                  data.boatsData.soloKayaks
                    ? (
                      <Statistic
                        title={`Одномісні каяки, ${data.boatsData.soloKayaks} од.`}
                        value={priceSoloKayak! * data.boatsData.soloKayaks}
                        suffix="ГРН"
                      />
                    )
                    : null
                }
                {
                  data.boatsData.doubleKayaks
                    ? (
                      <Statistic
                        title={`Двомісні каяки, ${data.boatsData.doubleKayaks} од.`}
                        value={priceDoubleKayak! * data.boatsData.doubleKayaks}
                        suffix="ГРН"
                      />
                    )
                    : null
                }
                {
                  data.boatsData.sups
                    ? (
                      <Statistic
                        title={`Сапи, ${data.boatsData.sups} од.`}
                        value={priceSup! * data.boatsData.sups}
                        suffix="ГРН"
                      />
                    )
                    : null
                }
              </Card>
              {
                (data.equipmentData.childSeats
                  || data.equipmentData.carbonPaddles
                  || data.equipmentData.neopreneSkirts
                  || data.equipmentData.nylonSkirts
                  || data.equipmentData.waterproofCases)
                  ? (
                    <Card
                      title="Спорядження:"
                      size="small"
                      bodyStyle={{
                        display: 'flex',
                        flexDirection: 'column',
                        rowGap: '15px',
                      }}
                    >
                      {
                        data.equipmentData.childSeats
                          ? (
                            <Statistic
                              title={`Дитячі сидіння, ${data.equipmentData.childSeats} од.`}
                              value={priceChildSeat! * data.equipmentData.childSeats}
                              suffix="ГРН"
                            />
                          )
                          : null
                      }
                      {
                        data.equipmentData.carbonPaddles
                          ? (
                            <Statistic
                              title={`Карбонові весла, ${data.equipmentData.carbonPaddles} од.`}
                              value={priceCarbonPaddle! * data.equipmentData.carbonPaddles}
                              suffix="ГРН"
                            />
                          )
                          : null
                      }
                      {
                        data.equipmentData.neopreneSkirts
                          ? (
                            <Statistic
                              title={`Неопренові спідниці, ${data.equipmentData.neopreneSkirts} од.`}
                              value={priceNeopreneSkirt! * data.equipmentData.neopreneSkirts}
                              suffix="ГРН"
                            />
                          )
                          : null
                      }
                      {
                        data.equipmentData.nylonSkirts
                          ? (
                            <Statistic
                              title={`Нейлонові спідниці, ${data.equipmentData.nylonSkirts} од.`}
                              value={priceNylonSkirt! * data.equipmentData.nylonSkirts}
                              suffix="ГРН"
                            />
                          )
                          : null
                      }
                      {
                        data.equipmentData.waterproofCases
                          ? (
                            <Statistic
                              title={`Водонепроникні чохли, ${data.equipmentData.waterproofCases} од.`}
                              value={priceWaterproofCase! * data.equipmentData.waterproofCases}
                              suffix="ГРН"
                            />
                          )
                          : null
                      }
                    </Card>
                  )
                  : null
              }
              <Card
                title="Загальна вартість:"
                size="small"
                bodyStyle={{
                  display: 'flex',
                  flexDirection: 'column',
                  rowGap: '15px',
                }}
              >
                <Statistic value={amount} suffix="ГРН" />
              </Card>
            </div>
          )
      }
      <PaymentWidget
        amount={amount}
        data={data}
        setPaymentStatus={setPaymentStatus}
        setIsPaymentLoaded={setIsPaymentLoaded}
      />
    </>
  );
}

export default ThirdStep;
