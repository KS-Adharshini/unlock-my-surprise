// Serverless API: GET /api/levels-meta
// Returns public level questions, clues, and metadata WITHOUT secret passwords or love letters
import { getPublicLevelsMeta } from './_lib/levelData.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const levels = getPublicLevelsMeta();
    return res.status(200).json({
      success: true,
      levels,
      totalLevels: levels.length,
    });
  } catch (err) {
    console.error('Error fetching levels meta:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
