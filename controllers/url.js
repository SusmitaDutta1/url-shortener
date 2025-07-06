const { nanoid } = require("nanoid");
const URL = require("../models/url");


async function handleGenerateNewShortURL(req, res) {
    const body = req.body;
    if(!body.url) return res.status(400).json({ error: "url is required" });
    const shortID = nanoid(6);

    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitedHistory: [],
    });

    return res.render("home", {id: shortID});
}

async function handleGetAnalytics(req, res){
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });
    return res.json({ 
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory
    });
}

async function handleDeletebyID(req, res){
    const shortId = req.params.shortId;
    await URL.findOneAndDelete({ shortId });

    return res.render("home");
}

module.exports = {
    handleGenerateNewShortURL,
    handleGetAnalytics,
    handleDeletebyID
}