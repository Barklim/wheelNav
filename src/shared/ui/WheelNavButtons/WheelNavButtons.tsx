import { Point } from "../../../types/wheelNav";
import { NavButton } from "../NavButton";
import styles from "./WheelNavButtons.module.scss";

export interface WheelNavButtonsProps {
  activeItem: number;
  points: Point[];
  handleRotate: (step: number) => void;
  disabled?: boolean;
}

export const WheelNavButtons = ({
  activeItem,
  points,
  handleRotate,
  disabled
}: WheelNavButtonsProps) => (
  <div className={styles.buttonsWrapper}>
    <p className={styles.buttonsTitle}>{`0${activeItem}/0${points.length}`}</p>
    <div className={styles.buttons}>
      <NavButton
        direction="left"
        disabled={activeItem === 1 || disabled}
        visuallyDisabled={activeItem === 1}
        onClick={() => handleRotate(1)}
      />
      <NavButton
        direction="right"
        disabled={activeItem === points.length || disabled}
        visuallyDisabled={activeItem === points.length}
        onClick={() => handleRotate(-1)}
      />
    </div>
  </div>
);
