import { useNavigate } from "react-router";
import { flushSync } from "react-dom";

export const useNavigateWithTransition = () => {
  const navigate = useNavigate();

  const navigateWithTransition = (to: string) => {
    if (!document.startViewTransition) {
      navigate(to);
      return;
    }

    document.startViewTransition(() => {
      flushSync(() => navigate(to));
    });
  };

  return navigateWithTransition;
};
