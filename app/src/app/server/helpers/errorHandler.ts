import { ZodError } from "zod";
import { CustomError } from "./customError";

interface IErrorResult {
  message: string;
  status: number;
}

export function errorHandler(err: unknown): IErrorResult {
  if (err instanceof ZodError) {
    const issues = err.issues;
    const mesages = issues.map((issue) => {
      return `${issue.path} - ${issue.message}`;
    });

    const message = mesages.join("; ");
    return { message, status: 400 };
  } else if (err instanceof CustomError) {
    return { message: err.message, status: err.status };
  } else {
    return { message: "ISE", status: 500 };
  }
}
