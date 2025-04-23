import { FC } from "react";
import { Point } from "../../../types/wheelNav";

export interface PointImgProps {
  point: Point;
  isActive?: boolean;
}

export type PointImgComponent = FC<PointImgProps>;