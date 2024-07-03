export interface User {
  id: string;
  email: string;
  name: string;
  joined: number;
  userType: string;
  address: string;
  phoneNumber: string;
}

export type UserCreateData = Omit<
  User,
  "joined" | "userType" | "address" | "phoneNumber"
>;
export type UserUpdateData = Partial<Omit<User, "id" | "joined">>;
