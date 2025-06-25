const fetch = require('node-fetch');

exports.getBuffer = async (url, options = {}) => {
    try {
        const res = await fetch(url, options);
        const buffer = await res.buffer();
        return buffer;
    } catch (err) {
        console.log("Error fetching buffer:", err);
        return null;
    }
};

exports.getGroupAdmins = (participants) => {
    let admins = [];
    for (let participant of participants) {
        if (participant.admin === "admin" || participant.admin === "superadmin") {
            admins.push(participant.id);
        }
    }
    return admins;
};

exports.sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};
