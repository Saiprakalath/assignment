import React from "react";
import { Breadcrumbs, Link, Box } from "@material-ui/core";
import { useSelector } from "react-redux";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

 const BreadcrumbBar =() => {
  const navigations = useSelector((state) => state?.path) ?? [];
  const barRef = React.useRef();

  React.useEffect(() => {
    const triggerScroll = () => {
      setTimeout(() => {
        const customScroll = barRef.current?.parentElement;
        const scrollEvent = new Event("scroll");

        if (typeof customScroll?.dispatchEvent === "function") {
          customScroll.dispatchEvent(scrollEvent);
        }
      }, 2000);
    };
    if (barRef.current) {
      triggerScroll();

      const routeListner = window.addEventListener("popstate", function () {
        triggerScroll();
      });
      return () => window.removeEventListener("popstate", routeListner);
    }
  }, []);

  return (
    <Box
      className="px-1 px-sm-3 pt-sm-4"
      marginBottom={["0px", "-20px"]}
      ref={barRef}
    >
      <Breadcrumbs separator={<NavigateNextIcon fontSize="medium" />}>
        {!!navigations.length &&
          navigations.map((nav, index) => {
            return (
              <Link
                key={index}
                color={"inherit"}
                href={nav?.path}
                onClick={nav?.handleClick}
              >
                {nav?.label}
              </Link>
            );
          })}
      </Breadcrumbs>
    </Box>
  );
};

export default BreadcrumbBar;