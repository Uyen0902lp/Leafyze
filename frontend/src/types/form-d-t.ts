export type IRegisterFormData = {
  name: string;
  email: string;
  password: string;
  remember: boolean;
};

export type ILoginFormData = {
  email: string;
  password: string;
};

export type ICheckoutFormData = {
  fname: string;
  lname: string;
  company?: string;
  state: string;
  country: string;
  address: string;
  city: string;
  zipCode: string; 
  phone: string;
  email: string;
  orderNote?: string;
};

export type IContactFormData = {
  name: string;
  email: string;
  subject: string;
  msg: string;
};

export type IReviewFormData = {
  review: string;
  name: string;
  email: string;
};

export type IUpdateProfileFormData = {
  name: string;
  email: string;
  phone: string;
  address: string;
  bio: string;
};

export type IChangePassFormData = {
  currentPassword:string;
  newPassword:string;
};
