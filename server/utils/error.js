exports.PromiseError = class PromiseError extends Error {
    constructor(error) {
        super(error);

        this.message = error.message;
        this.code = error.code;
    }
}