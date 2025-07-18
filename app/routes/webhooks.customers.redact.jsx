import { authenticate } from "../shopify.server";

export const action = async ({ request }) => {
  const { payload, shop, topic } = await authenticate.webhook(request);

  console.log(`Received ${topic} webhook for ${shop}`);
  
  // Handle customer data deletion (GDPR Article 17 - Right to Erasure)
  
  try {
    const customerId = payload.customer?.id;
    const ordersToRedact = payload.orders_to_redact || [];
    
    if (customerId) {
      // TODO: Implement your logic to:
      // 1. Delete or anonymize all customer data your app has stored
      // 2. This includes any generated metadata, logs, or cached data
      // 3. Ensure complete removal within 30 days as per GDPR
      
      console.log(`Redacting data for customer ${customerId}, orders: ${ordersToRedact.join(', ')}`);
      
      // Example: If you store any customer-specific metadata or preferences
      // you would delete them here. Since your app generates product metadata,
      // you might not have customer-specific data, but you should verify this.
      
      // If you need database access, import it only in the action function:
      // const { PrismaClient } = await import("@prisma/client");
      // const prisma = new PrismaClient();
      // await prisma.someTable.deleteMany({ where: { customerId } });
      // await prisma.$disconnect();
    }
    
    return new Response("Customer data redacted", { status: 200 });
  } catch (error) {
    console.error(`Error redacting customer data: ${error.message}`);
    return new Response("Error redacting customer data", { status: 500 });
  }
};