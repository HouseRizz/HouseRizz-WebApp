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
