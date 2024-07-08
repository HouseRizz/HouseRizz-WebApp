import { database } from "@/config/cloudkit.config";
import { Product, Order } from "@/types/cloudkit";

// Product operations

export async function addProduct(
  product: Omit<Product["fields"], "id">
): Promise<Product> {
  const fields = {
    ...product,
    id: { value: crypto.randomUUID() },
  };

  try {
    const response = await database.saveRecords([
      {
        recordType: "Products",
        fields,
      },
    ]);
    return response.records[0] as Product;
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
}

export async function getProducts(): Promise<Product[]> {
  try {
    const response = await database.performQuery({ recordType: "Products" });
    return response.records as Product[];
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

export async function deleteProduct(recordName: string): Promise<void> {
  try {
    await database.deleteRecords([recordName]);
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
}

// Order operations (including cart functionality)

export async function createOrUpdateOrder(
  order: Partial<Order["fields"]>,
  userId: string
): Promise<Order> {
  let existingOrder: Order | null = null;

  // Check if there's an existing order in cart for this user
  try {
    const response = await database.performQuery({
      recordType: "Orders",
      filterBy: [
        {
          fieldName: "buyerEmail",
          comparator: "=",
          fieldValue: { value: userId },
        },
        {
          fieldName: "orderStatus",
          comparator: "=",
          fieldValue: { value: "InCart" },
        },
      ],
    });
    existingOrder = response.records[0] as Order | null;
  } catch (error) {
    console.error("Error fetching existing order:", error);
  }

  const fields = existingOrder
    ? {
        ...existingOrder.fields,
        ...order,
        dateOfOrder: { value: Date.now() },
      }
    : {
        ...order,
        id: { value: crypto.randomUUID() },
        dateOfOrder: { value: Date.now() },
        orderStatus: { value: "InCart" },
        buyerEmail: { value: userId },
      };

  try {
    const response = await database.saveRecords([
      {
        recordType: "Orders",
        recordName: existingOrder?.recordName,
        fields,
      },
    ]);
    return response.records[0] as Order;
  } catch (error) {
    console.error("Error creating/updating order:", error);
    throw error;
  }
}

export async function getOrder(
  userId: string,
  status: string = "InCart"
): Promise<Order | null> {
  try {
    const response = await database.performQuery({
      recordType: "Orders",
      filterBy: [
        {
          fieldName: "buyerEmail",
          comparator: "=",
          fieldValue: { value: userId },
        },
        {
          fieldName: "orderStatus",
          comparator: "=",
          fieldValue: { value: status },
        },
      ],
    });
    return response.records[0] as Order | null;
  } catch (error) {
    console.error("Error fetching order:", error);
    throw error;
  }
}

export async function updateOrderStatus(
  recordName: string,
  status: string
): Promise<Order> {
  try {
    const response = await database.saveRecords([
      {
        recordType: "Orders",
        recordName,
        fields: { orderStatus: { value: status } },
      },
    ]);
    return response.records[0] as Order;
  } catch (error) {
    console.error("Error updating order status:", error);
    throw error;
  }
}

export async function deleteOrder(recordName: string): Promise<void> {
  try {
    await database.deleteRecords([recordName]);
  } catch (error) {
    console.error("Error deleting order:", error);
    throw error;
  }
}
