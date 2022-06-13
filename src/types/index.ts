import { Key } from 'react';

export interface IEvent {
  key: number;
  eventName: string;
  rentalStation: string;
  link: string;
  title: string;
  description: string;
  descriptionFeatures: string[];
  imageCover: string;
  imagesSlider: string[];
  dates: IDate[];
  price: IPrice[];
}

export interface ICustomer {
  key: Key;
  eventName: string;
  registrationTime: number;
  fullName: string;
  email: string;
  phone: number;
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

export interface ICustomerTransformed {
  key: Key;
  eventName: string;
  registrationTime: number;
  fullName: string;
  email: string;
  phone: string;
  eventDate: string;
  soloKayaks: number | string;
  doubleKayaks: number | string;
  isChildren: string;
  childrenAmount: number | string;
  amount: number;
  notes: string;
  isCompleted: boolean,
  isRejected: boolean,
  rejectedReason?: string;
}

// export interface IEvent {
//   key: number;
//   eventName: string;
//   rentalStation: string;
//   link: string;
//   title: string;
//   description: string;
//   descriptionFeatures: string[];
//   routeMap: string;
//   imageCover: string;
//   imagesSlider: string[];
// }

export interface IInstructor {
  key: Key;
  name: string;
  links?: {
    facebook?: string;
    instagram?: string;
  };
}

interface IPlaces {
  soloKayaks: number;
  doubleKayaks: number;
}

export interface IDate {
  key: Key;
  eventName: string;
  date: number;
  totalPlaces: IPlaces;
  freePlaces: IPlaces;
  instructor: string;
}

export interface IDateTransformed {
  key: Key;
  eventName: string;
  date: string;
  totalPlaces: IPlaces;
  freePlaces: IPlaces;
  instructor: string;
}

export interface IPrice {
  key: Key;
  eventName: string;
  soloKayak: number
  doubleKayak: number
}

export interface IRentalStation {
  key: Key;
  rentalName: string;
  address: string;
  totalPlaces: IPlaces;
}
