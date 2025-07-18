export const loader = async () => {
    const startTime = Date.now();
    
    try {
      // Simulate a lightweight operation to test response time
      await new Promise(resolve => setTimeout(resolve, 10));
      
      const responseTime = Date.now() - startTime;
      
      return new Response(
        JSON.stringify({ 
          status: 'ok',
          responseTime: `${responseTime}ms`,
          timestamp: new Date().toISOString()
        }), 
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
          },
        }
      );
    } catch (error) {
      return new Response(
        JSON.stringify({ 
          status: 'error', 
          error: error.message 
        }), 
        { status: 500 }
      );
    }
  };