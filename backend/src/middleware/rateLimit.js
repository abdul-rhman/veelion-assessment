const { rateLimit } = require('express-rate-limit');

const rateLimitMiddleware = rateLimit({
  windowMs: 60 * 1000,
  limit: 100,
  handler: (req, res) => {
    res.status(429).json({
      error: {
        message: 'Too many requests. Please try again later.',
      },
    });
  },
});

module.exports = rateLimitMiddleware;
