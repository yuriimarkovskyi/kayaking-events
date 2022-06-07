import { Key } from 'react';

interface IPlaces {
  soloKayaks: number;
  doubleKayaks: number;
}

export interface IInstructor {
  key: Key;
  name: string;
  links?: {
    facebook?: string;
    instagram?: string;
  };
}

interface IDates {
  date: number;
  totalPlaces: IPlaces;
  freePlaces: IPlaces;
  instructor: IInstructor;
}

interface IPrice {
  key: Key;
  title: string;
  price: number;
}

export interface IEvent {
  id: number;
  name: string;
  link: string;
  title: string;
  description: string;
  imageCover: string;
  dates: IDates[];
  price: IPrice[];
  imagesSlider: string[];
  descriptionFeatures: string[];
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
