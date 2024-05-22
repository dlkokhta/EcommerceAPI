export interface UserRegistrationTypes {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
  role: "user" | "admin";
  id: string;
}
