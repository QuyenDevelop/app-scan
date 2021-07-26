import { useCallback, useState } from "react";

export const useShow = (showData?: boolean) => {
  const [isShow, setIsShow] = useState<boolean>(showData || false);
  const show = useCallback(() => {
    setIsShow(true);
  }, []);
  const hide = useCallback(() => {
    setIsShow(false);
  }, []);
  return [isShow, show, hide] as const;
};
