import { FC } from "react";
import { Point } from "../../../types/wheelNav";

export interface PointImgProps {
  point: Point;
}

export type PointImgComponent = FC<PointImgProps>;

export type PointDotProps = {
  point: Point;
}