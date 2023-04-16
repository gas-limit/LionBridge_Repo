import React, { Component, useState } from 'react';
import './index.css';
import './App.css';

import { LIONBRIDGEMODAL } from "./modal.js";

import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import '@rainbow-me/rainbowkit/styles.css';

import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { avalanche, arbitrum } from 'wagmi/chains';


const { chains, provider } = configureChains(
  [arbitrum, avalanche],
  [
    alchemyProvider({ apiKey: process.env.ALCHEMY_ID }),
    publicProvider()
  ]
);

import { ConnectButton } from '@rainbow-me/rainbowkit';

const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  projectId: 'YOUR_PROJECT_ID',
  chains
});
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})





export default function App(){
  const [appOpened,setAppOpened] = useState(false);
  
    return (
      <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <div >
      <div className="flex flex-col bg-[#F4F4F4]">
        <div className='flex flex-row text-center align-middle'>
          <h1 className='text-xl h-[32px] text-black-500 p-6'>🦁 Lion Bridge</h1>
          <div style={{marginLeft:350,marginTop:25}}>
          <ConnectButton />
          </div>
          {/* <h2 className='text-md text-black-500 p-6'>Cross-chain instant swap</h2> */}
          {/* <li>
            <ol>
              <a>Test</a>
            </ol>
            <ol>
              <a>Test</a>
            </ol>
          </li>
        </div>
        <div className='flex flex-row h-screen w-screen justify-center place-items-center'>
          <div className='flex flex-row'>
            <div className='flex flex-col border-2 border-black p-4 mx-24 justify-center place-items-center'>
              <div>
                Withdraw
              </div>
              <input type="text" className='w-[256px]' placeholder='Enter the amount to withdraw...'/>
              <button className='text-black-500 bg-blue-500 w-[256px] p-2'>Withdraw</button>
            </div>
            <div className='flex flex-col border-2 border-black p-4 justify-center place-items-center'>
              <div>
                Deposit
              </div>
              <input type="text" className='w-[256px]' placeholder='Enter the amount to deposit...' />
              <button className='text-black-500 bg-blue-500 w-[256px] p-2'>Withdraw</button>
            </div>
          </div>*/}
        </div> 
        {appOpened && provider && <LIONBRIDGEMODAL/>}
        {!appOpened && 
        (<>
        
        <div style={{textAlign:"center"}}>

          <div style={{fontSize:35, marginTop: 100}}>Bridge assets securely</div>
            <div style={{fontSize:20, margin: 40}}> Lion Bridge is a Peer-to-Peer platform that allows you to swap assets between different blockchains using liquidity pools.</div>

          <button style={{background:"gold",padding:15,width:250,borderRadius:16}} onClick={() => setAppOpened(true)}>Open App</button>
       
       <div style={{margin:180}}>
        Created using:
        <div>
          <div style={{display:"flex",justifyContent:"center"}}>
            <img style={{height:60, margin:15}} src="https://moonbeam.network/wp-content/uploads/2021/05/Axelar-Logo-Update.png"/>
            <img style={{height:60, margin:15}} src="https://www.tally.xyz/_next/image?url=https%3A%2F%2Fstatic.tally.xyz%2F51cc280c-b992-4f5c-8190-d5aabd1f82c9_original.png&w=384&q=75"/>
            <img style={{height:60, margin:15}} src="https://upload.wikimedia.org/wikipedia/en/0/03/Avalanche_logo_without_text.png"/>
          </div>
          <div>

          </div>
        </div>
       </div>
       
       
       
        </div>
        
        </>)
        
        }       


      </div>
      </div>
      </RainbowKitProvider>
      </WagmiConfig>
    );
  }


