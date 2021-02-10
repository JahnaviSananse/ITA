import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
// import {
//   ChangePassword,
//   Chat,
//   Discover,
//   EnterCode,
//   Evolution,
//   Filter,
//   FingerPrint,
//   Flyer,
//   ForgotPassword,
//   Fund,
//   GettingStarted,
//   ImageScreen,
//   Language,
//   LanguageNotification,
//   Library,
//   Login,
//   News,
//   Notification,
//   NotSignIn,
//   Privacy,
//   Product,
//   Profile,
//   ReportAnIssue,
//   ResetPassword,
//   Resources,
//   RiskProfile,
//   RiskProfileFinalStep,
//   RiskProfileModal,
//   SearchScreen,
//   Security,
//   Setting,
//   SignUp,
//   SignupPassword,
//   SocialPosts,
//   Splash,
//   TouchID,
//   Video,
//   WebViewScreen,
// } from '../src/screens';
// import GuestTabbarScreen from './screens/GuestTabbarScreen';
// import MainTabbarScreen from './screens/MainTabbarScreen';
import navigationRef from './routes/router';

const Stack = createStackNavigator();
export const AppNavigator = createStackNavigator(
  {
    // Splash: {screen: Splash},
    // Login: {screen: Login},
    // SignUp: {screen: SignUp},
    // ForgotPassword: {screen: ForgotPassword},
    // ResetPassword: {screen: ResetPassword},
    // EnterCode: {screen: EnterCode},
    // Discover: {screen: Discover},
    // Library: {screen: Library},
    // Resources: {screen: Resources},
    // Profile: {screen: Profile},
    // News: {screen: News},
    // Product: {screen: Product},
    // Language: {screen: Language},
    // LanguageNotification: {screen: LanguageNotification},
    // Fund: {screen: Fund},
    // Filter: {screen: Filter},
    // Video: {screen: Video},
    // Setting: {screen: Setting},
    // Notification: {screen: Notification},
    // FingerPrint: {screen: FingerPrint},
    // ChangePassword: {screen: ChangePassword},
    // GettingStarted: {screen: GettingStarted},
    // Security: {screen: Security},
    // SocialPosts: {screen: SocialPosts},
    // Evolution: {screen: Evolution},
    // RiskProfile: {screen: RiskProfile},
    // RiskProfileFinalStep: {screen: RiskProfileFinalStep},
    // ReportAnIssue: {screen: ReportAnIssue},
    // Chat: {screen: Chat},
    // SignupPassword: {screen: SignupPassword},
    // Flyer: {screen: Flyer},
    // TouchID: {screen: TouchID},
    // Privacy: {screen: Privacy},
    // SearchScreen: {screen: SearchScreen},
    // WebViewScreen: {screen: WebViewScreen},
    // NotSignIn: {screen: NotSignIn},
    // RiskProfileModal: {screen: RiskProfileModal},
    // ImageScreen: {screen: ImageScreen},
    // MainTabbarScreen: {
    //   screen: MainTabbarScreen,
    //   navigationOptions: {
    //     gesturesEnabled: false,
    //   },
    // },
    // GuestTabbarScreen: {
    //   screen: GuestTabbarScreen,
    //   navigationOptions: {
    //     gesturesEnabled: false,
    //   },
    // },
  },
  {
    headerMode: 'none',
  },
);

export const Auth = () => (
  <NavigationContainer ref={navigationRef}>
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  </NavigationContainer>
);

// export default AppNavigator;
