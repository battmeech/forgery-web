import { chakra, HTMLChakraProps } from "@chakra-ui/react";
import { motion, HTMLMotionProps } from "framer-motion";

type MotionBoxProps = Omit<
  HTMLChakraProps<"div">,
  keyof HTMLMotionProps<"div">
> &
  HTMLMotionProps<"div">;

export const MotionBox: React.FC<MotionBoxProps> = motion(chakra.div);
