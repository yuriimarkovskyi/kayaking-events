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
  eventName: string;
  registrationTime: number;
  fullName: string;
  email: string;
  phone: number | string;
  eventDate: number;
  soloKayaks: number;
  doubleKayaks: number;
  isChildren: boolean;
  childrenAmount: number;
  amount: number;
  notes: string;
  isCompleted: boolean,
  isRejected: boolean,
  rejectedReason?: string;
}

interface ICustomerUI
  extends Omit<ICustomer, 'registrationTime' | 'phone' | 'eventDate' | 'isChildren' | 'childrenAmount'> {
  registrationTime: string;
  phone: string;
  eventDate: string;
  isChildren: string;
  childrenAmount: number | string;
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
  sups?: number;
}

interface IEquipment {
  childSeats?: number;
  carbonPaddles?: number;
  skirts?: {
    neoprene?: number;
    nylon?: number;
  };
  waterproofCases?: number;
}

interface IDate {
  key: number;
  eventName: string;
  date: number;
  totalPlaces: IPlaces;
  freePlaces: IPlaces;
  instructor: string;
}

interface IDateUI extends Omit<IDate, 'date'> {
  date: string;
}

interface IPrice {
  key: number;
  eventName: string;
  soloKayak: number;
  doubleKayak: number;
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
  IEvent,
  IEventImages,
  ICustomer,
  ICustomerUI,
  IInstructor,
  IDate,
  IDateUI,
  IPrice,
  IRentalStation,
};
