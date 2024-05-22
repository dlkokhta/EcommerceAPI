export interface newUserTypes {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
  role: "user" | "admin";
}
