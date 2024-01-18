exports.PromiseError = class PromiseError extends Error {
    constructor(error) {
        super(error);

        this.message = error.message;
        this.code = error.code;
    }
}

exports.InternalError = class InternalError extends Error {
    constructor(error) {
        super(error);
    }
}