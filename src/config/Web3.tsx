'use client';
import '@rainbow-me/rainbowkit/styles.css'
import React from 'react'

import merge from 'lodash.merge';
import { configureChains, createClient, WagmiConfig } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { ReactNode } from 'react'
import { infuraProvider } from 'wagmi/providers/infura'
import {
    argentWallet,
    coinbaseWallet,
    imTokenWallet,
    injectedWallet,
    ledgerWallet,
    metaMaskWallet,
    omniWallet,
    rainbowWallet,
    trustWallet,
    walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { ConnectButton, connectorsForWallets, RainbowKitProvider,
  darkTheme,
    Theme,
  getDefaultWallets
} from '@rainbow-me/rainbowkit';
  
import { particleWallet } from '@particle-network/rainbowkit-ext';
import { useMemo } from 'react';
import { ParticleNetwork } from '@particle-network/auth';
// import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { goerli } from '@wagmi/chains';



const myTheme = merge(darkTheme(), {
  colors: {
    accentColor: '#000',
  },
} as Theme);

interface Props {
  children: ReactNode
}

const Fuji = {
  id: 43113,
  name: 'Fuji Testnet',
  network: 'Avalanche Fuji Testnet',
  iconUrl: 'https://docs.avax.network/img/favicon.png',
  iconBackground: '#fff',
  nativeCurrency: {
    decimals: 18,
    name: 'AVAX',
    symbol: 'AVAX',
  },
  rpcUrls: {
    public: { http: ['wss://avalanche-fuji-c-chain.publicnode.com'] },
    default: { http: ['wss://avalanche-fuji-c-chain.publicnode.com'] },
  },
  blockExplorers: {
    default: { name: 'Explorer', url: 'https://phoenix.lightlink.io/' },

  }
};

export function Web3Provider ( props: Props )
{
  
   const particle = useMemo(() => {
            return new ParticleNetwork({
                projectId: process.env.NEXT_PUBLIC_PROJECT_ID as string,
                clientKey: process.env.NEXT_PUBLIC_CLIENT_KEY as string,
                appId: process.env.NEXT_PUBLIC_APP_ID as string,
                wallet: {
                    displayWalletEntry: true,
                },
            });
        }, []);
  const infurakey = process.env.NEXT_PUBLIC_INFURA_KEY 
   
const { chains, provider } = configureChains([ goerli,Fuji], [ infuraProvider( { apiKey : infurakey } ),publicProvider() ] )

   const popularWallets = useMemo(() => {
        return {
            groupName: 'Popular',
            wallets: [
                particleWallet({ chains, authType: 'google' }),
                particleWallet({ chains, authType: 'facebook' }),
                particleWallet({ chains, authType: 'apple' }),
                particleWallet({ chains }),
                injectedWallet({ chains }),
                // rainbowWallet({ chains }),
                // coinbaseWallet({ appName: "Web3 Agent", chains }),
                // metaMaskWallet({ chains }),
                // walletConnectWallet({ chains }),
            ],
        };
   }, [ particle ] );
  
// const { connectors } = getDefaultWallets({
//   appName: SITE_NAME,
//   chains,
// })
  
  const connectors = connectorsForWallets( [
      
        popularWallets
    ]);

const client = createClient({
  autoConnect: true,
  connectors,
  provider,
})

  return (
    <WagmiConfig  client={client}>
      <RainbowKitProvider modalSize="compact" initialChain={5} theme={myTheme} coolMode chains={chains}>
        { props.children }
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
