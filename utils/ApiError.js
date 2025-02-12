// export class AppError extends Error {
//     constructor(message, statuscode) {
//         super(message);
//         this.statuscode = statuscode;
//     }
// }

export class AppError extends Error{
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

