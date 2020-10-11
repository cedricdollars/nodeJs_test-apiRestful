class ErrorHandler extends Error {

    constructor(code, message) {
        super();
        this.code = code;
        this.message = message;
    }
}
const handleError = (err, res) => {
    const {
        code,
        message
    } = err;
    res.status(code).json({
        code,
        message,
        error: true
    })
}
module.exports = {
    ErrorHandler,
    handleError
};