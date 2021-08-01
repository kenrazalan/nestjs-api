export type AuthCreateInput = {
    fullname: string;
    email: string;
    dob: Date;
    password: string;
  };

  export type AuthLoginInput = {
    email: string;
    password: string;
  };
  export enum STATUS {
    success= "SUCCESS",
    failed= "FAILED"
  }