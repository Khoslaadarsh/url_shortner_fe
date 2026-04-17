import { ANIMATION_DURATION, ANIMATION_EASING } from "../data/constant";

export const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: ANIMATION_DURATION, ease: ANIMATION_EASING, delay },
});
