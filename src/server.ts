import "./lib/error-capture";
import { AppBootstrap } from "./server/bootstrap/app.bootstrap";

export default {
  async fetch(request: Request, env: unknown, ctx: unknown): Promise<Response> {
    return AppBootstrap.handleRequest(request, env, ctx);
  },
};
