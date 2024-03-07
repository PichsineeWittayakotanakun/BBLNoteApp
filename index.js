import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import App from './src/route/RootRoute';

AppRegistry.registerComponent(appName, () => App);
