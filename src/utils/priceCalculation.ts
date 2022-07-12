const priceCalculation = (
  priceSoloKayak: number,
  amountSoloKayaks: number,
  priceDoubleKayak: number,
  amountDoubleKayaks: number,
  priceSup: number,
  amountSups: number,
  priceChildSeat: number,
  amountChildSeats: number,
  priceCarbonPaddle: number,
  amountCarbonPaddles: number,
  priceNeopreneSkirt: number,
  amountNeopreneSkirts: number,
  priceNylonSkirt: number,
  amountNylonSkirts: number,
  priceWaterproofCase: number,
  amountWaterproofCase: number,
) => priceSoloKayak * amountSoloKayaks
    + priceDoubleKayak * amountDoubleKayaks
    + priceSup * amountSups
    + priceChildSeat * amountChildSeats
    + priceCarbonPaddle * amountCarbonPaddles
    + priceNeopreneSkirt * amountNeopreneSkirts
    + priceNylonSkirt * amountNylonSkirts
    + priceWaterproofCase * amountWaterproofCase;

export default priceCalculation;
