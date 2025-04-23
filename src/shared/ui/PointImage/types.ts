import { FC } from "react";
import { Point } from "../../../types/wheelNav";

export interface PointImgProps {
  point: Point;
}

export type PointImgComponent = FC<PointImgProps>;

export interface PointIamgeProps {
  point: Point;
  isActive?: boolean;
}