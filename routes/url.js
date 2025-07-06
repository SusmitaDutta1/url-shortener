const express = require('express');
const { handleGenerateNewShortURL, handleGetAnalytics, handleDeletebyID } = require("../controllers/url");

const router = express.Router();

router.post('/', handleGenerateNewShortURL);

router.get("/analytics/:shortId", handleGetAnalytics);

router.delete("/:shortId", handleDeletebyID);

module.exports = router;