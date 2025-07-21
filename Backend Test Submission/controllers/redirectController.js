import Url from '../models/Url.js';

export const redirectToOriginal = async (req, res, next) => {
  try {
    const { shortcode } = req.params;
    const record = await Url.findOne({ shortcode });

    if (!record) return next({ status: 404, message: 'Shortcode not found' });
    if (new Date() > record.expiresAt)
      return next({ status: 410, message: 'Link has expired' });

    record.clicks.push({
      timestamp: new Date(),
      referrer: req.get('referrer') || 'Unknown',
      location: 'India' 
    });

    await record.save();
    res.redirect(record.originalUrl);
  } catch (err) {
    next(err);
  }
};
