import Url from '../models/Url.js';
import { generateShortcode } from '../utils/generateShortcode.js';

export const createShortUrl = async (req, res, next) => {
  try {
    const { url, validity = 30, shortcode } = req.body;

    if (!/^https?:\/\/.+$/.test(url)) {
      return next({ status: 400, message: 'Invalid URL format' });
    }

    let finalCode = shortcode || generateShortcode();

    if (!/^[a-zA-Z0-9]{4,10}$/.test(finalCode)) {
      return next({ status: 422, message: 'Shortcode must be alphanumeric (4–10 chars)' });
    }

    const exists = await Url.findOne({ shortcode: finalCode });
    if (exists) return next({ status: 409, message: 'Shortcode already exists' });

    const expiresAt = new Date(Date.now() + validity * 60 * 1000);
    const newEntry = await Url.create({ originalUrl: url, shortcode: finalCode, expiresAt });

    res.status(201).json({
      shortLink: `${process.env.BASE_URL}/${finalCode}`,
      expiry: newEntry.expiresAt.toISOString()
    });
  } catch (err) {
    next(err);
  }
};
