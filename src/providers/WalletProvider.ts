import { useWallet } from 'solana-wallets-vue';
import {
  Connection, type Cluster, clusterApiUrl,
  Keypair, Transaction, LAMPORTS_PER_SOL, 
  SystemProgram, PublicKey
} from '@solana/web3.js';

import { DEV_PROGRAM_ID } from '@app/configs/Program';

export class WalletProvider {
  private connection: Connection;
  constructor(cluster: Cluster) {
    this.connection = new Connection(clusterApiUrl(cluster));
  }

  async getBalance() {
    const { publicKey } = useWallet();
    if (! publicKey.value) return;
    
    return await this.updateBalance(this.connection, publicKey.value);
  }

  async depositIntoPool(depositAmount: number) {
    const { publicKey, sendTransaction } = useWallet();
    if (! publicKey.value || depositAmount === 0) return;

    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: publicKey.value,
        toPubkey: new PublicKey(DEV_PROGRAM_ID),
        lamports: depositAmount * LAMPORTS_PER_SOL
      })
    );
    
    const signature = await sendTransaction(transaction, this.connection);
    await this.connection.confirmTransaction(signature, 'processed');

    return await this.updateBalance(this.connection, publicKey.value);
  }

  async withdrawFunds() {
    console.log('hi you clicked me!');
  }

  async devRequestAirdrop() {
    const { publicKey } = useWallet();
    if (! publicKey.value) return;

    const signature: string = await this.connection.requestAirdrop(publicKey.value, LAMPORTS_PER_SOL);
    await this.connection.confirmTransaction(signature, 'processed');

    return await this.updateBalance(this.connection, publicKey.value);
  }

  private async updateBalance(connection: Connection, pubKey: PublicKey): Promise<number> {
    const lamports = await connection.getBalance(pubKey, 'confirmed');
    const newBalance = lamports / LAMPORTS_PER_SOL;

    return newBalance;
  }
}