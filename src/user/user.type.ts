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