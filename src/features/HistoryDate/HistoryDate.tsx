import { useState } from "react";
import { WHEEL_NAV_CONSTANTS } from "../../shared/constants/wheelNav";
import { WheelNavWrapper } from "../../shared/ui/WheelNav";
import { PointDot } from "../../shared/ui/PointDot";
import { excludeLast } from "../../lib";
import styles from "./HistoryDate.module.scss";

export const HistoryDate = () => {
  const [activeItem, setActiveItem] = useState(1);

  return (
    <div className={styles.historyDateWrapper}>
      <div className={styles.fullScreenWrapper}>
        <WheelNavWrapper
          initialPoints={excludeLast(WHEEL_NAV_CONSTANTS.POINTS, 2)}
          duration={WHEEL_NAV_CONSTANTS.DURATION}
          radius={WHEEL_NAV_CONSTANTS.RADIUS}
          initialAngle={WHEEL_NAV_CONSTANTS.INITIAL_ANGLE}
          intervals={WHEEL_NAV_CONSTANTS.INTERVALS}
          customPoint={PointDot}
          onActiveItemChange={setActiveItem}
        />
        <div className={styles.slider}>Slide: {activeItem}</div>
      </div>
    </div>
  );
};
