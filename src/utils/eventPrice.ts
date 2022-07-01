const eventPrice = (
  isChildren: boolean,
  amountSolo:number,
  amountDouble:number,
  priceSolo: number,
  priceDouble:number,
  childrenAmount: number,
) => {
  if (isChildren) {
    return priceSolo * amountSolo + priceDouble * amountDouble * 2
      + (childrenAmount * priceDouble) / 2;
  }
  return priceSolo * amountSolo + priceDouble * amountDouble * 2;
};

export default eventPrice;
