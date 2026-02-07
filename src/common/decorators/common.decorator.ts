import { applyDecorators } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { CommonErrors } from "../consts/error.js";
import { Type } from "@nestjs/common";

type Constructor = new (...args: unknown[]) => unknown;
type RequireAuthDecoratorParam = {
  summary: string;
  succesfulResponseParams: {
    description?: string;
    type: string | Constructor | Type<unknown> | [Constructor] | undefined;
  };
  okResponse?: boolean;
};
/**
 * Decorator with Authentication
 * Summary: Operation summary
 *  Response params: Response documentation
 *  Includes Unathorized error documentation response
 */
export function RequireAuth({
  summary,
  succesfulResponseParams,
  okResponse = true,
}: RequireAuthDecoratorParam) {
  const successfulResponse = [
    ApiOkResponse({
      description: succesfulResponseParams.description ?? "Succesful",
      type: succesfulResponseParams.type,
    }),
  ];
  const decorators = [
    ApiOperation({ summary }),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({
      description: "Unauthorized",
      example: CommonErrors.AUTH_ERROR.unauthorized,
    }),
  ];

  if (okResponse) {
    decorators.push(...successfulResponse);
  }
  return applyDecorators(...decorators);
}
