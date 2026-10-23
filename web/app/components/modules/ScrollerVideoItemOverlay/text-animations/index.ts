import airportFlap from "./airportFlap";
import stackRoll from "./stackRoll";
import stackRoll3d from "./stackRoll3d";

export const textAnimations = { airportFlap, stackRoll, stackRoll3d };

export type TextAnimationName = keyof typeof textAnimations;

export const isTextAnimation = (s: unknown): s is TextAnimationName =>
  typeof s === "string" && s in textAnimations;
