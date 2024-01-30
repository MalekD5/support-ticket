import { TRPCError, initTRPC } from "@trpc/server";
import {
  createExpressMiddleware,
  type CreateExpressContextOptions,
} from "@trpc/server/adapters/express";
import { ZodError } from "zod";
import { importSPKI, jwtVerify } from "jose";
import { env } from "../env";

const createContext = ({ req }: CreateExpressContextOptions) => {
  const token = req.headers.authorization;

  return {
    token:
      !!token && token.includes("Bearer") ? token.split(" ")[1] : undefined,
  };
};

type Context = Awaited<ReturnType<typeof createContext>>;

const t = initTRPC.context<Context>().create({
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.code === "BAD_REQUEST" && error.cause instanceof ZodError
            ? error.cause.flatten()
            : null,
      },
    };
  },
});

export const router = t.router;

export const procedure = t.procedure.use(async (opts) => {
  const { token } = opts.ctx;
  console.log("pro", token);
  if (!token) {
    throw new TRPCError({
      code: "BAD_REQUEST",
    });
  }

  try {
    const pubKey = await importSPKI(env.CLERK_PEM_PUBLIC_KEY, "RS256");
    const { payload } = await jwtVerify(token, pubKey);

    return opts.next({
      ctx: {
        user: payload,
      },
    });
  } catch (err) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
    });
  }
});

const appRouter = router({
  test: procedure.query((opts) => {
    console.log(opts.ctx.user);
    return {
      message: "hello wrold",
    };
  }),
  getUser: procedure.mutation((opts) => {
    return "test";
  }),
});

export const expressMiddleware = createExpressMiddleware({
  router: appRouter,
  createContext,
});

export type AppRouter = typeof appRouter;
