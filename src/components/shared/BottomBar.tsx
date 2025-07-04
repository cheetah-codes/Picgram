import { bottombarLinks } from "@/constants";
import { INavLink } from "@/types";

import { Link, useLocation } from "react-router-dom";

const BottomBar = () => {
  const { pathname } = useLocation();
  return (
    <section className="bottom-bar">
      {bottombarLinks.map(({ label, route, imgURL }) => {
        const isActive = pathname === route;
        return (
          <Link
            to={`${route}`}
            key={label}
            className={`${
              isActive && `bg-primary-500 rounded-[10px]`
            } flex-col gap-1 p-2 transition flex-center`}
          >
            <img
              src={imgURL}
              alt="logo"
              width={16}
              height={16}
              className={` ${isActive && `invert-white`}`}
            />
            <p className="tiny-medium text-light-2">{label}</p>
          </Link>
        );
      })}
    </section>
  );
};

export default BottomBar;
