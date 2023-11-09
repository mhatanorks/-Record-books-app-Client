import clsx from "clsx";

const NavButton = ({
  status,
  setStatus,
  nav,
}: {
  status: string;
  setStatus: Function;
  nav: string;
}) => {
  return (
    <button
      onClick={() => setStatus(nav)}
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
