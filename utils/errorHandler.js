class ErrorResponse extends Error {
    constructor(message, statusCode) {
        this.message = message;
        this.statusCode = statusCode;
    }
}

module.exports = ErrorResponse;
