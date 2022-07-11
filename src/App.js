import React, { useRef, useEffect, useContext } from 'react';
import { useLocation, Switch } from 'react-router-dom';
import AppRoute from './utils/AppRoute';
import ScrollReveal from './utils/ScrollReveal';
import ReactGA from 'react-ga';
import "./App.css";

import LayoutDefault from './layouts/LayoutDefault';    // general layouts
import HomeView from './views/HomeView';    // page views
import MintView from './views/MintView';

import { AppContext } from './components/contexts/AppContext';

import '@rainbow-me/rainbowkit/dist/index.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import {
  chain,
  configureChains,
  createClient,
  WagmiConfig,
} from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';


const { chains, provider } = configureChains(
  [
    // chain.polygonMumbai, 
    // chain.polygon, 
    chain.localhost
  ],
  [
    alchemyProvider({ alchemyId: process.env.ALCHEMY_ID }),
    publicProvider()
  ]
);
const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  chains
});
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})


// Initialize Google Analytics
ReactGA.initialize(process.env.REACT_APP_GA_CODE);
const trackPage = page => {
  ReactGA.set({ page });
  ReactGA.pageview(page);
};


// COMPONENT
const App = () => {

  const { test } = useContext(AppContext)
  // console.log(test)

  const childRef = useRef();    // location variables
  let location = useLocation();

  useEffect(() => {
    const page = location.pathname;
    document.body.classList.add('is-loaded')
    childRef.current.init();
    trackPage(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <AppContext.Provider value={{test}}>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          <ScrollReveal
            ref={childRef}
            children={() => (
              <Switch>
                <AppRoute exact path="/" component={HomeView} layout={LayoutDefault} />
                <AppRoute exact path="/mint" component={MintView} layout={LayoutDefault} />
              </Switch>
            )} />
        </RainbowKitProvider>
      </WagmiConfig>
    </AppContext.Provider>
  );
}

export default App;
