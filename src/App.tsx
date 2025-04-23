import { WheelNavWrapper } from "./components/WheelNav";
import { WHEEL_NAV_CONSTANTS } from "./shared/constants/wheelNav";
import "./main.scss";

const App = () => (
  <WheelNavWrapper 
    initialPoints={WHEEL_NAV_CONSTANTS.POINTS}
    radius={WHEEL_NAV_CONSTANTS.RADIUS}
    duration={WHEEL_NAV_CONSTANTS.DURATION}
  />
);

export default App;
