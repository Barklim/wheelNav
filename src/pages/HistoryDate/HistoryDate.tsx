import { WheelNavWrapper } from "../../shared/ui/WheelNav";
import { WHEEL_NAV_CONSTANTS } from "../../shared/constants/wheelNav";

const HistoryDatePage = () => (
  <WheelNavWrapper 
    initialPoints={WHEEL_NAV_CONSTANTS.POINTS}
    duration={WHEEL_NAV_CONSTANTS.DURATION}
    radius={WHEEL_NAV_CONSTANTS.RADIUS}
    initialAngle={WHEEL_NAV_CONSTANTS.INITIAL_ANGLE}
    intervals={WHEEL_NAV_CONSTANTS.INTERVALS}
  />
);

export default HistoryDatePage;
