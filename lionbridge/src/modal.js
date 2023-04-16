import React, { useState, useEffect } from "react";
import "./index.css";

export function DAIUSDCSwap() {
  const [slot1Symbol, setSlot1Symbol] = useState("Arbitrum");
  const [slot2Symbol, setSlot2Symbol] = useState("Avalanche");
  const [slot2Icon, setSlot2Icon] = useState(
    "https://www.tally.xyz/_next/image?url=https%3A%2F%2Fstatic.tally.xyz%2F51cc280c-b992-4f5c-8190-d5aabd1f82c9_original.png&w=384&q=75"
  );
  const [slot1Icon, setSlot1Icon] = useState(
    "https://upload.wikimedia.org/wikipedia/en/0/03/Avalanche_logo_without_text.png"
  );

  function switchAssets() {
    const templink = slot1Icon;
    setSlot1Icon(slot2Icon);
    setSlot2Icon(templink);
    const tempAsset = slot1Symbol;
    setSlot1Symbol(slot2Symbol);
    setSlot2Symbol(tempAsset);
  }



  return (
    <>
      <h1
        style={{
          textAlign: "center"
        }}
      ></h1>

      <div className="swapBox">
        <div style={{ marginTop: 8, marginLeft: 10, marginBottom: 10 }}>
          {" "}
          <b>
          Bridge Assets </b>{" "}
        </div>
        <img
          src="https://i.ibb.co/qj83t99/swap.png"
          className="switchAssets"
          onClick={() => switchAssets()}
        />
        
        <div className="selectAsset1">
          {slot1Symbol}
          <img className="tokenIcon" src={slot2Icon} />
        </div>
        <div className="selectAsset2">
          {slot2Symbol}
          <img className="tokenIcon" src={slot1Icon} />
        </div>



        <input placeholder="amount" className="asset" type="number" />
<Dropdown/>
        <button className="swapButton"> Bridge </button>
        <div style={{margin:10}}>
        ⚠️ Make sure there is enough liquidity in the pool to bridge your assets.
        </div>
      </div>
    </>
  );
}

export function DAIUSDCDeposit() {
  return (
    <>
      <h1
        style={{
          textAlign: "center"
        }}
      ></h1>

      <div className="swapBox">
        <div style={{ marginTop: 8, marginLeft: 10, marginBottom: 10 }}>
          {" "}
          <b>
          Add Liquidity</b>{" "}
        </div>



        <input placeholder="amount" className="asset" type="number" />

      
        <Dropdown/>

<div style={{margin:10}}>
    Network: <b>Arbitrum</b>
    <img className="tokenIcon" src="https://www.tally.xyz/_next/image?url=https%3A%2F%2Fstatic.tally.xyz%2F51cc280c-b992-4f5c-8190-d5aabd1f82c9_original.png&w=384&q=75" />

</div>
      

        <button style={{marginTop:10}}className="swapButton"> Deposit </button>
        <div style={{margin:20}}>
        ✨ Earn 0.02% of all trades on this pair proportional to your share of the pool.
        </div>   
      </div>



    </>
  );
}

export function DAIUSDCWithdraw() {
  return (
    <>
      <div className="swapBox">
        <div style={{ marginTop: 8, marginLeft: 10, marginBottom: 10 }}>
          {" "}
          <b>Remove Liquidity</b>{" "}
        </div>

        <input placeholder="amount" className="asset" type="number" /> <Dropdown/>
        <div style={{margin:10}}>
    Network: <b>Arbitrum</b>
    <img className="tokenIcon" src="https://www.tally.xyz/_next/image?url=https%3A%2F%2Fstatic.tally.xyz%2F51cc280c-b992-4f5c-8190-d5aabd1f82c9_original.png&w=384&q=75" />

</div>
        

        <button style={{margin:10}} className="swapButton"> Withdraw </button>
        <div style={{margin:10}}>⚠️ Your redeemed assets may come from multiple networks</div>
      </div>
    </>
  );
}

export function PoolData() {
  return (
    <>
      <div className="swapBox" style={{ height: 350 }}>
        <div style={{ marginTop: 8, marginLeft: 10, marginBottom: 10 }}>
          <h3> <b>Contracts</b> </h3>
          <table>
            <tr>
              <td style={{ paddingLeft: 0 }} align="left">
                Arbitrum Pool
              </td>
              <td style={{ paddingLeft: 0 }} align="right">
              <img style={{width:15,height:15}}src="https://i.ibb.co/4Y2ZLmY/external-link-1.png"/>
              </td>
            </tr>

            <tr>
              <td style={{ paddingLeft: 0 }} align="left">
                Avalanche Pool
              </td>
              <td style={{ paddingLeft: 0 }} align="right">
              <img style={{width:15,height:15}}src="https://i.ibb.co/4Y2ZLmY/external-link-1.png"/>
              </td>
            </tr>
          </table>
          <h4> <b>Currency reserves</b> </h4>
          <h3>Arbitrum</h3>
          <table>
            <tr>
              <td style={{ paddingLeft: 0 }} align="left">
                DAI
              </td>
              <td style={{ paddingLeft: 0 }} align="right">
                -
              </td>
            </tr>

            <tr>
              <td style={{ paddingLeft: 0 }} align="left">
                USDC
              </td>
              <td style={{ paddingLeft: 0 }} align="right">
                -
              </td>
            </tr>
            <tr>
              <td style={{ paddingLeft: 0 }} align="left">
                USDT
              </td>
              <td style={{ paddingLeft: 0 }} align="right">
                -
              </td>
            </tr>
          </table>
          <h3>Avalanche</h3>
          <table>
            <tr>
              <td style={{ paddingLeft: 0 }} align="left">
                DAI
              </td>
              <td style={{ paddingLeft: 0 }} align="right">
                -
              </td>
            </tr>

            <tr>
              <td style={{ paddingLeft: 0 }} align="left">
                USDC
              </td>
              <td style={{ paddingLeft: 0 }} align="right">
                -
              </td>
            </tr>
            <tr>
              <td style={{ paddingLeft: 0 }} align="left">
                USDT
              </td>
              <td style={{ paddingLeft: 0 }} align="right">
                -
              </td>
            </tr>
          </table>
        </div>
      </div>
    </>
  );
}

export const LIONBRIDGEMODAL = () => {
  const [activeTab, setActiveTab] = useState(1);
  function handleTabClick(tab) {
    setActiveTab(tab);
  }

  return (
    <div className="tab-container">
      <h2>  </h2>
      <div className="tab-buttons">
        <button
          style={{}}
          className={activeTab === 1 ? "active" : "inactive"}
          onClick={() => handleTabClick(1)}
        >
          Bridge
        </button>
        <button
          className={activeTab === 2 ? "active" : "inactive"}
          onClick={() => handleTabClick(2)}
        >
          Add 
        </button>
        <button
          className={activeTab === 3 ? "active" : "inactive"}
          onClick={() => handleTabClick(3)}
        >
          Remove 
        </button>
      </div>
      <br />
      <div className="tab-content">
        {activeTab === 1 && <DAIUSDCSwap />}
        {activeTab === 2 && <DAIUSDCDeposit />}
        {activeTab === 3 && <DAIUSDCWithdraw />}

        <PoolData />
      </div>
    </div>
  );
};


function Dropdown() {
    const [selectedOption, setSelectedOption] = useState("Asset");
    const options = ["USDC", "DAI", "USDT"];
  
    const handleOptionClick = (option) => {
      setSelectedOption(option);
    };
  
    return (
      <div className="dropdown">
        <button>{selectedOption}</button>
        <div className="dropdown-content">
          {options.map((option) => (
            <a key={option} href="#" onClick={() => handleOptionClick(option)}>
              {option}
            </a>
          ))}
        </div>
      </div>
    );
  }