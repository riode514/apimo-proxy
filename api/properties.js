// netlify/functions/properties.js
const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  const token = '68460111a25a4d1ba2508ead22a2b59e16cfcfcd';
  const agencyId = '24985';  // Agency ID correcto
  const providerId = '4352'; // Provider ID para referencia
  
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
    console.log(`Calling Apimo API for agency ${agencyId}...`);
    
    // URL correcta con agency_id
    const apiUrl = `https://api.apimo.pro/agencies/${agencyId}/properties`;
    console.log('API URL:', apiUrl);
    
    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('Apimo API response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.log('API Error Response:', errorText);
      throw new Error(`Apimo API error: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const data = await response.json();
    console.log('Data received successfully');
    console.log('Properties count:', Array.isArray(data) ? data.length : data?.properties?.length || 'Unknown structure');
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        agencyId: agencyId,
        providerId: providerId,
        data: data,
        timestamp: new Date().toISOString()
      })
    };
    
  } catch (error) {
    console.error('Function error:', error.message);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        success: false,
        error: 'Internal Server Error',
        details: error.message,
        agencyId: agencyId,
        providerId: providerId,
        timestamp: new Date().toISOString()
      })
    };
  }
};
