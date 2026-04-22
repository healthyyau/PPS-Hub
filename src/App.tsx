import React from 'react';
import { useRoute } from './router';
import Overview from './pages/streams/account-onboarding/Overview';
import TradingTools from './pages/TradingTools';
import Funds from './pages/Funds';
import ReferAFriend from './pages/ReferAFriend';
import Partners from './pages/Partners';
import ProfileSettings from './pages/ProfileSettings';

export default function App(): React.ReactElement {
  const [route] = useRoute();

  switch (route) {
    case 'funds':            return <Funds />;
    case 'trading-tools':    return <TradingTools />;
    case 'partners':         return <Partners />;
    case 'refer-a-friend':   return <ReferAFriend />;
    case 'profile-settings': return <ProfileSettings />;
    case 'home':
    default:                 return <Overview />;
  }
}
