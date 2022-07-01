interface ICategory {
  key: number;
  categoryName: string;
  link: string;
}

interface ICategoryImages {
  imageCover: string;
}

interface ICustomer {
  key: number;
  registrationTime: number;
  eventData: {
    eventName: string;
    eventDate: number;
  }
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

interface IEvent {
  key: number;
  eventName: string;
  rentalStation: string;
  link: string;
  routeMap: string;
  title: string;
  description: string;
  features: string[];
  availableBoats: IAvailableBoats;
  cover: string;
}

interface IEventImages {
  cover: string;
  slider: string[];
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
  soloKayaks: number;
  doubleKayaks: number;
  sups: number;
}

interface IPriceBoatsUI extends Omit<IPriceBoats, 'soloKayaks' | 'doubleKayaks' | 'sups'> {
  soloKayaks: number | string;
  doubleKayaks: number | string;
  sups: number | string;
}

interface IPriceEquipment {
  key: number;
  childSeats: number;
  carbonPaddles: number;
  neopreneSkirts: number;
  nylonSkirts: number;
  waterproofCases: number;
}

interface IPriceEquipmentUI {
  key: number;
  childSeats: number | string;
  carbonPaddles: number | string;
  neopreneSkirts: number | string;
  nylonSkirts: number | string;
  waterproofCases: number | string;
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
  ICategoryImages,
  ICustomer,
  ICustomerUI,
  IDate,
  IDateUI,
  IEquipment,
  IEvent,
  IEventImages,
  IInstructor,
  IPlaces,
  IPriceBoats,
  IPriceBoatsUI,
  IPriceEquipment,
  IPriceEquipmentUI,
  IRentalStation,
};
