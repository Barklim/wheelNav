import { FC } from "react";
import { Point } from "../../../types/wheelNav";

export interface PointDotProps {
  point: Point;
}

export type PointDotComponent = FC<PointDotProps>;

export interface PointDotProps {
  point: Point;
  isActive?: boolean;
}