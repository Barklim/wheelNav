import { useState } from "react";
import { WHEEL_NAV_CONSTANTS } from "../../shared/constants/wheelNav";
import { WheelNavCore, WheelNavWrapper } from "../../shared/ui/WheelNav";
import { PointImage } from "../../shared/ui/PointImage";
import { excludeLast } from "../../lib";
import styles from "./HistoryDateList.module.scss";

export const HistoryDateList = () => {
  const [, setActiveItem] = useState(1);

  const filteredPoints5 = excludeLast(WHEEL_NAV_CONSTANTS.POINTS, 1);
  const filteredPoints4 = excludeLast(WHEEL_NAV_CONSTANTS.POINTS, 2);
  const filteredPoints3 = excludeLast(WHEEL_NAV_CONSTANTS.POINTS, 3);
  const filteredPoints2 = excludeLast(WHEEL_NAV_CONSTANTS.POINTS, 4);

  return (
    <div className={styles.wheelListWrapper}>
      <div className={styles.firstGrid}>
        <WheelNavCore
          initialPoints={filteredPoints5}
          radius={130}
          onActiveItemChange={setActiveItem}
        />
        <WheelNavCore
          initialPoints={WHEEL_NAV_CONSTANTS.POINTS}
          radius={130}
          customPoint={PointImage}
          onActiveItemChange={setActiveItem}
        />
        <WheelNavCore
          initialPoints={filteredPoints4}
          radius={130}
          initialAngle={45}
          intervals={WHEEL_NAV_CONSTANTS.INTERVALS}
          onActiveItemChange={setActiveItem}
        />
        <WheelNavCore
          initialPoints={filteredPoints3}
          radius={130}
          initialAngle={120 - 45}
          intervals={WHEEL_NAV_CONSTANTS.INTERVALS}
          onActiveItemChange={setActiveItem}
        />
      </div>

      <div className={styles.secondGrid}>
        <WheelNavCore
          initialPoints={filteredPoints4}
          radius={80}
          intervals={WHEEL_NAV_CONSTANTS.INTERVALS}
          onActiveItemChange={setActiveItem}
        />
        <WheelNavCore
          initialPoints={filteredPoints3}
          radius={80}
          initialAngle={120 - 45}
          onActiveItemChange={setActiveItem}
        />
        <WheelNavCore
          initialPoints={filteredPoints2}
          radius={80}
          initialAngle={180}
          onActiveItemChange={setActiveItem}
        />

        <WheelNavCore
          initialPoints={filteredPoints4}
          duration={2}
          radius={80}
          intervals={WHEEL_NAV_CONSTANTS.INTERVALS}
          onActiveItemChange={setActiveItem}
        />
        <WheelNavCore
          initialPoints={filteredPoints3}
          duration={2}
          radius={80}
          initialAngle={120 - 45}
          onActiveItemChange={setActiveItem}
        />
        <WheelNavCore
          initialPoints={filteredPoints2}
          duration={2}
          radius={80}
          initialAngle={180}
          onActiveItemChange={setActiveItem}
        />
      </div>
    </div>
  );
};
