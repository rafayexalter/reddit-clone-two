import { Router, useRouter } from "next/router";

export default function Sub() {
  const router = useRouter();

  const { sub } = router.query;

  return <div>{sub}</div>;
}
