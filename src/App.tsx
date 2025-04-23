import { WheelNavWrapper } from "./components/WheelNav";
import { WHEEL_NAV_CONSTANTS } from "./shared/constants/wheelNav";
import "./main.scss";

const App = () => (
  <WheelNavWrapper 
    initialImages={WHEEL_NAV_CONSTANTS.INITIAL_IMAGES}
    radius={WHEEL_NAV_CONSTANTS.RADIUS}
  />
);

export default App;
