import { authenticate } from "../shopify.server";

export const action = async ({ request }) => {
  const { payload, shop, topic } = await authenticate.webhook(request);

  console.log(`Received ${topic} webhook for ${shop}`);
  
  // Handle customer data request (GDPR Article 15 - Right of Access)
  // You must provide a way for customers to request their data
  
  try {
    const customerId = payload.customer?.id;
    const ordersRequested = payload.orders_requested || [];
    
    if (customerId) {
      // TODO: Implement your logic to:
      // 1. Collect all customer data your app has stored
      // 2. Send the data to the customer or make it available for download
      // 3. Log the request for compliance tracking
      
      console.log(`Data request for customer ${customerId}, orders: ${ordersRequested.join(', ')}`);
      
      // Example: You might need to query your database for any metadata
      // generated for this customer's products and provide it to them
    }
    
    return new Response("Data request processed", { status: 200 });
  } catch (error) {
    console.error(`Error processing customer data request: ${error.message}`);
    return new Response("Error processing data request", { status: 500 });
  }
};