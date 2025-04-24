import { useState } from "react";
import { WHEEL_NAV_CONSTANTS } from "../../shared/constants/wheelNav";
import { WheelNavCore } from "../../shared/ui/WheelNav";
import { PointImage } from "../../shared/ui/PointImage";
import { excludeLast } from "../../lib";
import styles from "./HistoryDateList.module.scss";

export const HistoryDateList = () => {
  const [, setActiveItem] = useState(1);

  const createFilteredPoints = (n: number) => excludeLast(WHEEL_NAV_CONSTANTS.POINTS, n);

  return (
    <div className={styles.wheelListWrapper}>
      <div className={styles.firstGrid}>
        <WheelNavCore
          initialPoints={WHEEL_NAV_CONSTANTS.POINTS}
          radius={130}
          onActiveItemChange={setActiveItem}
        />
        <WheelNavCore
          initialPoints={createFilteredPoints(1)}
          radius={130}
          customPoint={PointImage}
          onActiveItemChange={setActiveItem}
        />
        <WheelNavCore
          initialPoints={createFilteredPoints(4)}
          radius={130}
          initialAngle={45}
          intervals={WHEEL_NAV_CONSTANTS.INTERVALS}
          onActiveItemChange={setActiveItem}
        />
        <WheelNavCore
          initialPoints={createFilteredPoints(3)}
          radius={130}
          initialAngle={72 - 45}
          onActiveItemChange={setActiveItem}
        />
      </div>

      <div className={styles.secondGrid}>
        <WheelNavCore
          initialPoints={createFilteredPoints(4)}
          radius={80}
          intervals={WHEEL_NAV_CONSTANTS.INTERVALS}
          onActiveItemChange={setActiveItem}
        />
        <WheelNavCore
          initialPoints={createFilteredPoints(5)}
          radius={80}
          initialAngle={120 - 45}
          onActiveItemChange={setActiveItem}
        />
        <WheelNavCore
          initialPoints={createFilteredPoints(6)}
          radius={80}
          initialAngle={180 - 45}
          onActiveItemChange={setActiveItem}
        />

        <WheelNavCore
          initialPoints={createFilteredPoints(4)}
          duration={2}
          radius={80}
          intervals={WHEEL_NAV_CONSTANTS.INTERVALS}
          onActiveItemChange={setActiveItem}
        />
        <WheelNavCore
          initialPoints={createFilteredPoints(5)}
          duration={2}
          radius={80}
          initialAngle={120 - 45}
          onActiveItemChange={setActiveItem}
        />
        <WheelNavCore
          initialPoints={createFilteredPoints(6)}
          duration={2}
          radius={80}
          initialAngle={180 - 45}
          onActiveItemChange={setActiveItem}
        />
      </div>
    </div>
  );
};
