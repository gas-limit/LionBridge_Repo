import React, { Component } from 'react';
import logo from './logo.svg';
import './index.css';
import './App.css';

import { LIONBRIDGEMODAL } from "./modal.js";

class App extends Component {
  render() {
    return (
      <div className="flex flex-col bg-[#F4F4F4]">
        <div className='flex flex-row text-center align-middle'>
          <h1 className='text-xl h-[32px] text-black-500 p-6'>Lion Swap</h1>
          <h2 className='text-md text-black-500 p-6'>Cross-chain instant swap</h2>
          <li>
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
          </div>
        </div>
        <LIONBRIDGEMODAL/>
      </div>
    );
  }
}

export default App;
