import Url from '../models/Url.js';

export const getStats = async (req, res, next) => {
  try {
    const { shortcode } = req.params;
    const record = await Url.findOne({ shortcode });

    if (!record) return next({ status: 404, message: 'Shortcode not found' });

    res.json({
      shortcode: record.shortcode,
      originalUrl: record.originalUrl,
      createdAt: record.createdAt,
      expiry: record.expiresAt,
      totalClicks: record.clicks.length,
      clicks: record.clicks
    });
  } catch (err) {
    next(err);
  }
};
