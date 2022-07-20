declare global {
  interface Window {
    LiqPayCheckoutCallback: any;
    LiqPayCheckout: any;
  }
}

interface IPaymentPayload {
  version: number;
  public_key: string | undefined;
  action: string;
  amount: number;
  currency: string;
  description: string;
  order_id: string | number;
}

interface ICustomer {
  key: number;
  registrationTime: number;
  eventName: string;
  eventDate: number;
  customerData: {
    fullName: string;
    email: string;
    phone: number | string;
  }
  boatsData: {
    soloKayaks: number;
    doubleKayaks: number;
    sups: number;
  }
  equipmentData: {
    childSeats: number;
    carbonPaddles: number;
    neopreneSkirts: number;
    nylonSkirts: number;
    waterproofCases: number;
  }
  amount: number;
  notes: string;
  isCompleted: boolean,
  isRejected: boolean,
  rejectedReason?: string;
}

interface ICustomerUI {
  key: number;
  registrationTime: string;
  eventName: string;
  eventDate: string;
  fullName: string;
  email: string;
  phone: string;
  soloKayaks: number | undefined;
  doubleKayaks: number | undefined;
  sups: number | undefined;
  childSeats: number | undefined;
  carbonPaddles: number | undefined;
  neopreneSkirts: number | undefined;
  nylonSkirts: number | undefined;
  waterproofCases: number | undefined;
  amount: number;
  notes: string;
  isCompleted: boolean,
  isRejected: boolean,
  rejectedReason?: string;
}

interface IAvailableBoats {
  soloKayaks: boolean;
  doubleKayaks: boolean;
  sups: boolean;
}

interface ICategory {
  key: number;
  categoryName: string;
  link: string;
  coverName: string;
  isPublished: boolean;
}

interface IEvent {
  key: number;
  eventName: string;
  categoryName: string;
  rentalStation: string;
  link: string;
  routeMap: string;
  title: string;
  description: string;
  features: string[];
  availableBoats: IAvailableBoats;
  cover: string;
  isPublished: boolean;
}

interface IInstructor {
  key: number;
  name: string;
  links?: {
    facebook?: string;
    instagram?: string;
  };
}

interface IPlaces {
  soloKayaks: number;
  doubleKayaks: number;
  sups: number;
}

interface IEquipment {
  childSeats: number;
  carbonPaddles: number;
  neopreneSkirts: number;
  nylonSkirts: number;
  waterproofCases: number;
}

interface IDate {
  key: number;
  eventName: string;
  date: number;
  totalPlaces: IPlaces;
  freePlaces: IPlaces;
  totalEquipment: IEquipment;
  freeEquipment: IEquipment;
  instructor: string;
}

interface IDateUI extends Omit<IDate, 'date'> {
  date: string;
}

interface IPriceBoats {
  key: number;
  eventName: string;
  soloKayak: number;
  doubleKayak: number;
  sup: number;
}

interface IPriceBoatsUI extends Omit<IPriceBoats, 'soloKayak' | 'doubleKayak' | 'sup'> {
  soloKayak: number | string;
  doubleKayak: number | string;
  sup: number | string;
}

interface IPriceEquipment {
  key: number;
  childSeat: number;
  carbonPaddle: number;
  neopreneSkirt: number;
  nylonSkirt: number;
  waterproofCase: number;
}

interface IRentalStation {
  key: number;
  rentalName: string;
  address: string;
  totalPlaces: IPlaces;
  equipment: IEquipment;
}

export type {
  ICategory,
  ICustomer,
  ICustomerUI,
  IDate,
  IDateUI,
  IEquipment,
  IEvent,
  IInstructor,
  IPaymentPayload,
  IPlaces,
  IPriceBoats,
  IPriceBoatsUI,
  IPriceEquipment,
  IRentalStation,
};
