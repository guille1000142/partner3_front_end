import { useEffect, useState } from "react";

export default function useUser({ tops }) {
  const [stats, setStats] = useState(false);

  useEffect(() => {
    if (tops) {
      getUserStats();
    }
  }, [tops]);

  const getUserStats = () => {};
  return { stats };
}
