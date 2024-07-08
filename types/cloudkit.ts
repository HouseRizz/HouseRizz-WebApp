export interface Product {
  recordName: string;
  recordType: "Products";
  fields: {
    address: string;
    category: string;
    description: string;
    id: string;
    imageURL1: { value: { downloadURL: string } };
    imageURL2?: { value: { downloadURL: string } };
    imageURL3?: { value: { downloadURL: string } };
    modelURL?: { value: { downloadURL: string } };
    name: string;
    price: number;
    supplier: string;
  };
}

export interface Order {
  recordName: string;
  recordType: "Orders";
  fields: {
    buyerAddress: string;
    buyerEmail: string;
    buyerName: string;
    buyerPhoneNumber: string;
    dateOfOrder: number;
    id: string;
    imageURL: { value: { downloadURL: string } };
    name: string;
    orderStatus: string;
    price: number;
    quantity: number;
    supplier: string;
  };
}

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
