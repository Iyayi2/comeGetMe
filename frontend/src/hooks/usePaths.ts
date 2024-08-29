import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const usePaths = () => {
  const { pathname } = useLocation();
  const [prevPath, setPrevPath] = useState(pathname);

  useEffect(() => {
    setPrevPath(pathname);
  }, [pathname]);

  return { pathname, prevPath };
};

export default usePaths;
