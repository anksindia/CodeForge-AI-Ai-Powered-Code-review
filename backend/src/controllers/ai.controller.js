const aiService = require("../services/ai.service.js");

module.exports.getReview = async (req, res) => {
  const code = req.body.code;

  if (!code) {
    return res.status(400).send({ reply: "No code provided" });    
  }

  const response = await aiService(code);
  res.json({ reply: response }); 
};
