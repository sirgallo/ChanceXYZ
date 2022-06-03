import { useWallet, useAnchorWallet } from 'solana-wallets-vue';
import {
  Connection, type Cluster, clusterApiUrl,
  PublicKey, TransactionInstruction, type Signer
} from '@solana/web3.js';
import { FriktionSDK, ConnectedVoltSDK } from '@friktion-labs/friktion-sdk';

export class VoltProvider {
  private connection: any;
  private friktion: any;

  constructor(cluster: Cluster) {
    const wallet = useAnchorWallet();
    
    if (wallet.value) {
      this.connection = new Connection(clusterApiUrl(cluster));
      this.friktion = new FriktionSDK({
        provider: {
          wallet: wallet.value,
          connection: this.connection
        }
      });
    }
  }

  async deposit(selectedVolt: string, depositAmount: number) {
    const { publicKey } = useWallet();
    const voltVaultId = new PublicKey(selectedVolt);
    
    if (publicKey.value) {
      const cVoltSDK = new ConnectedVoltSDK(
        this.connection,
        publicKey.value,
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