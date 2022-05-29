

import { 
  Connection, 
  clusterApiUrl, 
  LAMPORTS_PER_SOL 
} from '@solana/web3.js';
import { Store } from 'pinia';

export class WalletProvider {
  constructor(private publicKey, private store) {}

  async requestAirdrop() {
    if (!this.publicKey) {
      console.error('[requestAirdrop] public key not found');
      return;
    }

    const connection = new Connection(clusterApiUrl('devnet'));
    
    const signature: string = await connection
      .requestAirdrop(this.publicKey.value, LAMPORTS_PER_SOL);
    const latestBlockHash =  
    await connection.confirmTransaction(
      {
        blockhash: latestBlockHash.blockhash,
        lastValidBlockHeight: latestBlockHashv.lastValidBlockHeight,
        signature: airdropSignature,
      }
    );

    const lamports = await connection
      .getBalance(this.publicKey.value, 'confirmed');
    const newBalance = lamports / LAMPORTS_PER_SOL;
    
    this.store.setBalance(newBalance);
    
    console.log(`[requestAirdrop] success, balance is now ${newBalance} sol`);
  }

  async refreshBalance() {

  }
}