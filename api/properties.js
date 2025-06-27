export default async function handler(req, res) {
  const token = '68460111a25a4d1ba2508ead22a2b59e16cfcfcd'; // tu token Apimo
  const agencyId = '24985';
  const providerId = '4352';

  const response = await fetch(`https://api.apimo.net/api/v1/agency/${agencyId}/property?provider=${providerId}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  const data = await response.json();

  res.setHeader('Access-Control-Allow-Origin', '*'); // necesario para Squarespace
  res.status(200).json(data);
}
