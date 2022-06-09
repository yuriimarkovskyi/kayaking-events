import { Key } from 'react';

export interface IEvent {
  key: number;
  eventName: string;
  link: string;
  title: string;
  description: string;
  descriptionFeatures: string[];
  imageCover: string;
  imagesSlider: string[];
  dates: IDates[];
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
  soloKayaks: number;
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
//   link: string;
//   title: string;
//   description: string;
//   descriptionFeatures: string[];
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

export interface IDates {
  event: string;
  date: number;
  totalPlaces: IPlaces;
  freePlaces: IPlaces;
  instructor: IInstructor;
}

// export interface IPrice {
// //   event: string;
// //   soloKayak: {
// //     title: string;
// //     price: number;
// //   };
// //   doubleKayak: {
// //     title: string;
// //     price: number;
// //   };
// // }

interface IPrice {
  title: string;
  price: number;
}

export interface IRentals {
  rentalName: string;
  totalPlaces: IPlaces;
}
