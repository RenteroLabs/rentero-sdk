import React from 'react';
import { useAccount } from 'wagmi';
import './App.css';
import { ConnectWallet } from './ConnectWallet';
import RenteroExample from './Rentero';

function App() {
  const { address } = useAccount()

  return (
    <div className="App">
      <header className="App-header">
        <ConnectWallet />
        {address && <RenteroExample />}
      </header>
    </div>
  );
}

export default App;
