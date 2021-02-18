
package com.facebook.react;

import android.app.Application;
import android.content.Context;
import android.content.res.Resources;

import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainPackageConfig;
import com.facebook.react.shell.MainReactPackage;
import java.util.Arrays;
import java.util.ArrayList;

// @react-native-community/art
import com.reactnativecommunity.art.ARTPackage;
// @react-native-community/async-storage
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
// @react-native-community/masked-view
import org.reactnative.maskedview.RNCMaskedViewPackage;
// @react-native-community/netinfo
import com.reactnativecommunity.netinfo.NetInfoPackage;
// @react-native-community/viewpager
import com.reactnativecommunity.viewpager.RNCViewPagerPackage;
// @react-native-firebase/app
import io.invertase.firebase.app.ReactNativeFirebaseAppPackage;
// react-native-device-info
import com.learnium.RNDeviceInfo.RNDeviceInfo;
// react-native-exception-handler
import com.masteratul.exceptionhandler.ReactNativeExceptionHandlerPackage;
// react-native-fast-image
import com.dylanvann.fastimage.FastImageViewPackage;
// react-native-gesture-handler
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
// react-native-google-analytics-bridge
import com.idehub.GoogleAnalyticsBridge.GoogleAnalyticsBridgePackage;
// react-native-image-crop-picker
import com.reactnative.ivpusic.imagepicker.PickerPackage;
// react-native-linear-gradient
import com.BV.LinearGradient.LinearGradientPackage;
// react-native-localization
import com.babisoft.ReactNativeLocalization.ReactNativeLocalizationPackage;
// react-native-orientation
import com.github.yamill.orientation.OrientationPackage;
// react-native-print
import com.christopherdro.RNPrint.RNPrintPackage;
// react-native-reanimated
import com.swmansion.reanimated.ReanimatedPackage;
// react-native-safe-area-context
import com.th3rdwave.safeareacontext.SafeAreaContextPackage;
// react-native-screens
import com.swmansion.rnscreens.RNScreensPackage;
// react-native-share
import cl.json.RNSharePackage;
// react-native-touch-id
import com.rnfingerprint.FingerprintAuthPackage;
// react-native-vector-icons
import com.oblador.vectoricons.VectorIconsPackage;
// react-native-video
import com.brentvatne.react.ReactVideoPackage;
// react-native-view-shot
import fr.greweb.reactnativeviewshot.RNViewShotPackage;
// react-native-webview
import com.reactnativecommunity.webview.RNCWebViewPackage;
// react-native-youtube
import com.inprogress.reactnativeyoutube.ReactNativeYouTube;
// rn-fetch-blob
import com.RNFetchBlob.RNFetchBlobPackage;

public class PackageList {
  private Application application;
  private ReactNativeHost reactNativeHost;
  private MainPackageConfig mConfig;

  public PackageList(ReactNativeHost reactNativeHost) {
    this(reactNativeHost, null);
  }

  public PackageList(Application application) {
    this(application, null);
  }

  public PackageList(ReactNativeHost reactNativeHost, MainPackageConfig config) {
    this.reactNativeHost = reactNativeHost;
    mConfig = config;
  }

  public PackageList(Application application, MainPackageConfig config) {
    this.reactNativeHost = null;
    this.application = application;
    mConfig = config;
  }

  private ReactNativeHost getReactNativeHost() {
    return this.reactNativeHost;
  }

  private Resources getResources() {
    return this.getApplication().getResources();
  }

  private Application getApplication() {
    if (this.reactNativeHost == null) return this.application;
    return this.reactNativeHost.getApplication();
  }

  private Context getApplicationContext() {
    return this.getApplication().getApplicationContext();
  }

  public ArrayList<ReactPackage> getPackages() {
    return new ArrayList<>(Arrays.<ReactPackage>asList(
      new MainReactPackage(mConfig),
      new ARTPackage(),
      new AsyncStoragePackage(),
      new RNCMaskedViewPackage(),
      new NetInfoPackage(),
      new RNCViewPagerPackage(),
      new ReactNativeFirebaseAppPackage(),
      new RNDeviceInfo(),
      new ReactNativeExceptionHandlerPackage(),
      new FastImageViewPackage(),
      new RNGestureHandlerPackage(),
      new GoogleAnalyticsBridgePackage(),
      new PickerPackage(),
      new LinearGradientPackage(),
      new ReactNativeLocalizationPackage(),
      new OrientationPackage(),
      new RNPrintPackage(),
      new ReanimatedPackage(),
      new SafeAreaContextPackage(),
      new RNScreensPackage(),
      new RNSharePackage(),
      new FingerprintAuthPackage(),
      new VectorIconsPackage(),
      new ReactVideoPackage(),
      new RNViewShotPackage(),
      new RNCWebViewPackage(),
      new ReactNativeYouTube(),
      new RNFetchBlobPackage()
    ));
  }
}
