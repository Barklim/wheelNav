import { WheelNavWrapper } from "./components/WheelNav";
import { WHEEL_NAV_CONSTANTS } from "./shared/constants/wheelNav";
import "./main.scss";

const App = () => (
  <WheelNavWrapper 
    initialImages={WHEEL_NAV_CONSTANTS.INITIAL_IMAGES}
    circleSize={{
      width: "300px",
      height: "300px"
    }}
  />
);

export default App;
