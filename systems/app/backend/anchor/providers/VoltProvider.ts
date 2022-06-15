import {
  Connection, type Cluster, clusterApiUrl,
  PublicKey, TransactionInstruction, type Signer
} from '@solana/web3.js';
import { Wallet } from '@project-serum/anchor';
import { ProgramProvider } from '@anchor/providers/ProgramProvider';
import { 
  FriktionSDK, ConnectedVoltSDK 
} from '@friktion-labs/friktion-sdk';

import { readFileSync } from 'fs';

import { anchorConfiguration } from '@anchor/configs/AnchorConfirguration';

export class VoltProvider {
  private connection: Connection;
  private friktion: FriktionSDK;
  private programId: PublicKey;
  private wallet: Wallet;

  constructor(cluster: Cluster, private programProvider: ProgramProvider) {
    this.wallet = new Wallet(JSON.parse(readFileSync(anchorConfiguration.ANCHOR_WALLET, 'utf-8')));

    this.programId = programProvider.getProgramId();
    
    if (this.wallet) {
      this.connection = new Connection(clusterApiUrl(cluster));
      this.friktion = new FriktionSDK({
        provider: {
          wallet: this.wallet,
          connection: this.connection
        }
      });
    }
  }

  async deposit(selectedVolt: string, depositAmount: number) {
    const voltVaultId = new PublicKey(selectedVolt);
    
    if (this.wallet.publicKey) {
      const cVoltSDK = new ConnectedVoltSDK(
        this.connection,
        this.wallet.publicKey,
        await this.friktion.loadVoltByKey(voltVaultId),
        undefined
      );

      const voltVault = cVoltSDK.voltVault;
      const vaultTokenAccount = cVoltSDK.voltVault.vaultMint;

      const depositInstructions: TransactionInstruction[] = [];
      const signers: Signer[] = [];
      let depositTokenAccountKey: PublicKey | null;

      const pendingDepositInfo = await cVoltSDK.getPendingDepositForUser() || null;
      
      if (
        pendingDepositInfo && 
        pendingDepositInfo.roundNumber.lt(voltVault.roundNumber) &&
        pendingDepositInfo?.numUnderlyingDeposited.gtn(0)
      ) {
        depositInstructions.push(await cVoltSDK.claimPending(vaultTokenAccount));
      }
    }
  }

  async withdraw() {
    //  stub
  }
}