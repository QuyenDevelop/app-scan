import { useCallback, useState } from "react";

export const useToggle = (showData?: boolean) => {
  const [isShow, setIsShow] = useState<boolean>(showData || false);
  const toggle = useCallback(() => {
    setIsShow(show => !show);
  }, []);

  return [isShow, toggle] as const;
};
