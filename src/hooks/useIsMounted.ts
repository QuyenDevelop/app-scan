import { useEffect, useRef } from "react";

export function useIsMounted() {
  const isMounted = useRef(false);

  // @ts-ignore
  useEffect(() => {
    isMounted.current = true;
    return () => (isMounted.current = false);
  }, []);

  return isMounted;
}
