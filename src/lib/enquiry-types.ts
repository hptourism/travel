export type EnquiryInput = {
  name: string;
  phone: string;
  email: string;
  startingFrom: string;
  packageName: string;
  travellers: string;
  dates: string;
  details: string;
  page: string;
  source: string;
};

export type EnquiryView = EnquiryInput & {
  id: string;
  createdAt: string;
};
