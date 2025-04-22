import React from 'react';
import ReactDOM from 'react-dom/client';
import Text from './components/Text/Text';
import './main.scss';

const App = () => <Text text={'Wheel nav component'} />;

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);
