export const mediaQuery = () => {
  const     width = screen.width;
  const    height = screen.height;
  const landscape = width > height;
  const  isMobile =
    (width >= 320 && width <= 440 && !landscape) ||
    (width <= 960 && width >= 640 && height <= 440 && height >= 320 && landscape);

  return isMobile;
};
