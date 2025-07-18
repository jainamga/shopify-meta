export const loader = async () => {
    // Basic health check for Azure App Service
    try {
      // You can add more sophisticated health checks here
      // like database connectivity, external API status, etc.
      
      return new Response(
        JSON.stringify({ 
          status: 'healthy', 
          timestamp: new Date().toISOString(),
          service: 'meta-data-editor'
        }), 
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    } catch (error) {
      return new Response(
        JSON.stringify({ 
          status: 'unhealthy', 
          error: error.message,
          timestamp: new Date().toISOString()
        }), 
        {
          status: 503,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }
  };