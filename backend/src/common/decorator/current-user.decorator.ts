import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const CurrentUser = createParamDecorator(
  (data, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context).getContext();
    return ctx.req.user;
  },
);

export type CurrentUserPayload = {
  payload: any;
  userId: string;
};
