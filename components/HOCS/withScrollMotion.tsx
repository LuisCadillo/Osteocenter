import { motion } from "framer-motion";
/**
 * Provides subtle on-scroll animation
 */
const withScrollMotion =
  ({
    Element,
    direction = "y",
    variants = [60, 30, 0],
    duration = 1,
  }: {
    Element: any;
    direction?: string;
    variants?: Array<number>;
    duration?: number;
  }) =>
  /* eslint-disable react/display-name */
  ({ ...props }) => {
    const animation = {
      opacity: [0, 0, 1],
      [direction]: variants,
    };
    return (
      <motion.div
        initial={{ opacity: 0, [direction]: 40 }}
        whileInView={animation}
        transition={{ duration: duration, ease: "easeInOut" }}
        viewport={{ once: true }}
      >
        <Element {...props} />
      </motion.div>
    );
  };

export default withScrollMotion;
