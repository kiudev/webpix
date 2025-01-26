import { useNavigate } from "react-router";
import { flushSync } from "react-dom";

export const useNavigateWithTransition = () => {
  const navigate = useNavigate();
  // const location = useLocation();

  const navigateWithTransition = (to: string) => {
    if (!document.startViewTransition) {
      navigate(to);
      return;
    }

    const editorToHome = location.pathname === "/editor" && to === '/';
    document.documentElement.classList.toggle('slide-editor', editorToHome);

    document.startViewTransition(() => {
      flushSync(() => navigate(to));
    }).finished.then(() => {
      document.documentElement.classList.remove('slide-editor');
    });
  };

  return navigateWithTransition;
};
