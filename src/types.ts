export interface IJob {
  companyName: string;
  date: string;
  id: number;
  logo: string;
  longDescription: string;
  shortDescription: string;
  title: string;
}

export interface ICandidate {
  id: number;
  name: string;
  date: string;
  companyName: string;
  logo: string;
  longDescription: string;
  shortDescription: string;
  position: string;
  email: string;
}

export interface IFormDataRegister {
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  passwordConfirmation: string;
  disabled: boolean;
}

export interface IFormDataLogin {
  email: string;
  remember: boolean;
  username: string;
  lastname: string;
  password: string;
  buttonText: string;
  access_token: string;
  onClick: () => void;
}
