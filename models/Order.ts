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
