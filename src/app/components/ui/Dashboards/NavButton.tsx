import clsx from "clsx";
import { useCallback } from "react";

const NavButton = ({
  status,
  setStatus,
  nav,
}: {
  status: string;
  setStatus: Function;
  nav: string;
}) => {
  const handleClick = useCallback(() => {
    // viewTransitions未対応ブラウザの挙動
    if (!(document as any).startViewTransition) {
      setStatus(nav);
      return
    }
    // viewTransitions対応ブラウザの挙動
    (document as any).startViewTransition(async () => {
      await setStatus(nav);
    });
  }, [nav, setStatus]);

  return (
    <button
      onClick={handleClick}
      className={clsx(
        "px-7 py-2 mx-3 rounded-lg font-bold text-xl shadow-lg",
        { "bg-green-400 text-white": status === nav },
        { "bg-gray-200": status !== nav }
      )}
    >
      {nav}
    </button>
  );
};

export default NavButton;
