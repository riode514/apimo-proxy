// netlify/functions/properties.js
const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  const token = '68460111a25a4d1ba2508ead22a2b59e16cfcfcd';
  const providerId = '4352';
  
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    console.log('Calling Apimo API...');
    
    const response = await fetch(`https://api.apimo.pro/agencies/${providerId}/properties`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log('Apimo API response status:', response.status);

    if (!response.ok) {
      throw new Error(`Apimo API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Data received, properties count:', data?.length || data?.properties?.length || 0);
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(data)
    };
    
  } catch (error) {
    console.error('Function error:', error.message);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Internal Server Error',
        details: error.message,
        timestamp: new Date().toISOString()
      })
    };
  }
};
