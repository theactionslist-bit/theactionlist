import { ADMIN_LOGOUT_REDIRECT } from "./constant";
import { signOutAdmin } from "./service";

interface LogoutRouter {
  push: (url: string) => void;
  refresh: () => void;
}

export async function handleAdminLogout(router: LogoutRouter) {
  await signOutAdmin();
  router.push(ADMIN_LOGOUT_REDIRECT);
  router.refresh();
}
