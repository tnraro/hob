import { getUserOrRedirect } from "$lib/server/auth";

export async function load({ locals }) {
  const user = getUserOrRedirect(locals);

  return {
    user,
  };
}
