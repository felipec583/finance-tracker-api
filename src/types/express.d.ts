import type { LoginResponse } from "src/modules/auth/auth.types.ts";

declare global {
  namespace Express {
    interface Request {
      user?: LoginResponse;
    }
  }
}
