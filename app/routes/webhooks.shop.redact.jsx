import { authenticate } from "../shopify.server";

export const action = async ({ request }) => {
  const { payload, shop, topic } = await authenticate.webhook(request);

  console.log(`Received ${topic} webhook for ${shop}`);
  
  // Handle shop data deletion (when merchant requests data deletion)
  
  try {
    const shopId = payload.shop_id;
    const shopDomain = payload.shop_domain;
    
    // TODO: Implement your logic to:
    // 1. Delete all shop-related data your app has stored
    // 2. This includes generated metadata, cached data, logs, etc.
    // 3. Clean up any third-party integrations (like OpenAI generated content)
    // 4. Ensure complete removal within 30 days as per GDPR
    
    console.log(`Redacting all data for shop ${shopDomain} (ID: ${shopId})`);
    
    // Example cleanup - adjust based on what data your app actually stores:
    // - Generated alt text metadata
    // - Usage logs
    // - Any cached product information
    // - OpenAI API call logs related to this shop
    
    // If you need database access, import it only in the action function:
    // const { PrismaClient } = await import("@prisma/client");
    // const prisma = new PrismaClient();
    // await prisma.session.deleteMany({ where: { shop: shopDomain } });
    // await prisma.$disconnect();
    
    return new Response("Shop data redacted", { status: 200 });
  } catch (error) {
    console.error(`Error redacting shop data: ${error.message}`);
    return new Response("Error redacting shop data", { status: 500 });
  }
};