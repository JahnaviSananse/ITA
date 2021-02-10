import {combineReducers} from 'redux';
import authReducer from './Auth/reducers';
import discoverListReducer from './Discover/reducers';
import fundReducer from './Fund/reducers';
import getResources from './GetResource/reducers';
import libraryReducer from './Library/reducers';
import productReducer from './Products/reducers';
import recentFavReducer from './RecentFav/reducers';
import reportReducer from './Report/reducers';
import riskProfileReducer from './RiskProfile/reducers';
import userReducer from './User/reducers';
import videoReducer from './Videos/reducers';

const rootReducer = combineReducers({
  auth: authReducer,
  discover: discoverListReducer,
  user: userReducer,
  library: libraryReducer,
  fund: fundReducer,
  product: productReducer,
  video: videoReducer,
  report: reportReducer,
  recentfav: recentFavReducer,
  riskProfile: riskProfileReducer,
  resources: getResources,
});
export default rootReducer;
