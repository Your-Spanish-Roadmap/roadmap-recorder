export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
    const { url } = req.body || {};
    if (!url) return res.status(400).json({ error: 'Missing url' });

    const r = await fetch('https://api.short.io/links', {
      method: 'POST',
      headers: {
        'Authorization': process.env.SHORTIO_API_KEY,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        domain: 'voz.yourspanishroadmap.com',
        originalURL: url
      })
    });

    const data = await r.json();
    if (!r.ok) return res.status(r.status).json({ error: data });
    return res.status(200).json({ shortURL: data.shortURL });
  } catch (e) {
    return res.status(500).json({ error: String(e) });
  }
}
