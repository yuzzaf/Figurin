export class CustomError extends Error {
  public status: number = 500;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export class BadRequestError extends CustomError {
  constructor(message: string = "BadRequestError") {
    super(message, 400);
  }
}
export class UnauthorizedError extends CustomError {
  constructor(message: string = "unauthorizedError") {
    super(message, 401);
  }
}

export class ForbiddenError extends CustomError {
  constructor(message: string = "ForbiddenError") {
    super(message, 403);
  }
}
export class NotFoundError extends CustomError {
  constructor(message: string = "NotFoundError") {
    super(message, 404);
  }
}
