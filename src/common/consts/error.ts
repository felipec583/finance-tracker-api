export interface ErrorPayload {
  statusCode: number;
  timestamp: string;
  path: string;
  message: string;
  code: string;
}

type ErrorTypes = "HTTP_ERROR" | "DB_ERROR" | "INTERNAL_ERROR" | "AUTH_ERROR";
type ErrorContent = Record<string, ErrorPayload>;

const baseError = (
  statusCode: number,
  message: string,
  code: string,
): ErrorPayload => ({
  statusCode,
  timestamp: "2025-02-06T12:00:00.000Z",
  path: "/api/transactions",
  message,
  code,
});

export const CommonErrors: Record<ErrorTypes, ErrorContent> = {
  HTTP_ERROR: {
    badRequest: baseError(400, "Validation failed", "HTTP_ERROR"),
    unauthorized: baseError(401, "Unauthorized", "HTTP_ERROR"),
    forbidden: baseError(403, "Forbidden", "HTTP_ERROR"),
    notFound: baseError(404, "Not Found", "HTTP_ERROR"),
    conflict: baseError(409, "Conflict", "HTTP_ERROR"),
  },
  DB_ERROR: {
    generic: baseError(400, "Database Error", "DB_ERROR"),
    conflict: baseError(409, "This record already exists.", "DB_CONFLICT"),
    constraint: baseError(
      400,
      "Operation failed due to missing dependencies (Foreign Key).",
      "DB_CONSTRAINT",
    ),
  },
  INTERNAL_ERROR: {
    generic: baseError(500, "Internal server error", "INTERNAL_ERROR"),
  },
  AUTH_ERROR: {
    unauthorized: baseError(401, "Unauthorized", "HTTP_ERROR"),
    forbidden: baseError(403, "Forbidden", "HTTP_ERROR"),
  },
};
