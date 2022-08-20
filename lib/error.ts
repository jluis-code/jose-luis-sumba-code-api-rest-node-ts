export class NotFoundError {
    status: number;
    message: string;
    constructor(message: string) {
        this.message = message
        this.status = 404;
    }
}

export class Error400 {
    status: number;
    message: string;
    ; constructor(message: string) {
        this.message = message
        this.status = 400;
    }
}