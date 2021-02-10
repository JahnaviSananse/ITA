import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import {Alert, BackHandler} from 'react-native';
import {connect} from 'react-redux';
import {navigationRef} from '../src/routes/router';
import Home from './Home';

// const App = createReduxContainer(AppNavigator);

const ReduxNavigation = (props) => {
  const {nav, dispatch} = props;
  const navigation = useNavigation();

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    return BackHandler.removeEventListener(
      'hardwareBackPress',
      this.onBackPress,
    );
  });

  const onBackPress = () => {
    const {dispatch, nav} = this.props;
    if (nav.index === 0) {
      Alert.alert(
        'Exit App',
        'Exiting the application?',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => BackHandler.exitApp(),
          },
        ],
        {
          cancelable: false,
        },
      );
      return true;
    } else {
      dispatch(navigation.back());
      return true;
    }
  };
  console.log('REdux Navi');
  const Stack = createStackNavigator();
  const Auth = () => (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );

  return (
    <NavigationContainer ref={navigationRef}>
      <Auth />
    </NavigationContainer>
  );
};

const mapStateToProps = (state) => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(ReduxNavigation);
