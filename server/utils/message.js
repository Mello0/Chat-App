var generateMessage = (from, message) => {
    return {
        from: from,
        message: message,
        createdAt: new Date().getTime()
    };
};

module.exports = {
    generateMessage: generateMessage
}