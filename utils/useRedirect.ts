import { useMeQuery } from "../generated/graphql";
import { useRouter } from "next/router";

export const useRedirect = (
  redirectTo: "/main/personal/profile" | "/login",
  cb?: () => void
) => {
  const { data, loading } = useMeQuery();
  const router = useRouter();

  if (redirectTo === "/main/personal/profile" && data?.me.account) {
    if (cb) cb();
    router.push(redirectTo);
  } else if (redirectTo === "/login" && !loading && !data?.me.account) {
    if (cb) cb();
    router.push(redirectTo);
  }
};
