export default async function handler(req, res) {
  const token = '68460111a25a4d1ba2508ead22a2b59e16cfcfcd';
  const providerId = '4352';

  try {
    const response = await fetch(`https://api.apimo.net/api/v1/property?provider=${providerId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error(`Apimo API error: ${response.status}`);
    }

    const data = await response.json();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(data);

  } catch (error) {
    console.error('Serverless function error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
