export interface SignedInUser {
  recordName: string;
  recordType: "SignedInUsers";
  fields: {
    address: string;
    email: string;
    id: string;
    joined: number;
    name: string;
    phoneNumber: string;
    userType: string;
  };
}
