import {
  Connection,
  type Cluster,
  clusterApiUrl,
  Keypair,
  Transaction, 
  LAMPORTS_PER_SOL, 
  SystemProgram,
  PublicKey,
  sendAndConfirmTransaction
} from '@solana/web3.js';
/*
const voltVaultId = new PublicKey("VOLT_VAULT_ID_HERE")
const depositTokenMintAddress: string
const depositTokenDecimals: number
const friktionSDK: FriktionSDK
// Decimal is from import Decimal from "decimal.js";
const depositAmount: Decimal
const vaultTokenAccount // load user's vaultTokenAccount using cVoltSDK.voltVault.vaultMint

const cVoltSDK = new ConnectedVoltSDK(
    connection,
    wallet.publicKey,
    await friktionSDK.loadVoltByKey(voltVaultId),
    undefined
  );
  const voltVault = cVoltSDK.voltVault;
  const connection = connection;

  try {
    let depositInstructions: TransactionInstruction[] = [];
    const signers: Signer[] = [];
    let depositTokenAccountKey: PublicKey | null;

    try {
      pendingDepositInfo = await cVoltSDK.getPendingDepositForUser();
    } catch (err) {
      pendingDepositInfo = null;
    }

    if (
      pendingDepositInfo &&
      pendingDepositInfo.roundNumber.lt(voltVault.roundNumber) &&
      pendingDepositInfo?.numUnderlyingDeposited?.gtn(0)
    ) {
      console.log(
        "claiming pending:",
        pendingDepositInfo?.numUnderlyingDeposited.toString()
      );
      depositInstructions.push(
        await cVoltSDK.claimPending(vaultTokenAccount.pubKey)
      );
    }

    if (depositTokenMintAddress === WRAPPED_SOL_ADDRESS) {
        const rentBalance = await connection.getMinimumBalanceForRentExemption(
            AccountLayout.span
        );
        // Check if the wrapped token account already exists
        const {
            instructions: wrapSolInstructions,
            newTokenAccount: wrappedSolAccount,
        } = await initializeTokenAccountTx({
            connection: connection,
            payerKey: wallet.publicKey,
            mintPublicKey: new PublicKey(WRAPPED_SOL_ADDRESS),
            owner: wallet.publicKey,
            rentBalance: rentBalance,
            extraLamports: depositAmount.toNumber() * LAMPORTS_PER_SOL,
        });
        depositInstructions = depositInstructions.concat(wrapSolInstructions);
        signers.push(wrappedSolAccount);
        depositTokenAccountKey = wrappedSolAccount.publicKey;
    } else {
        // load depositTokenAccount using depositTokenMintAddress
        const depositTokenAccount
        depositTokenAccountKey = depositTokenAccount.pubKey;
    }

    if (!vaultTokenAccount) {
        const { tokenDest, createTokenAccountIx } =
            await createAssociatedTokenAccountInstruction(
            voltVault.vaultMint,
            wallet.publicKey
            );
        depositInstructions.push(createTokenAccountIx);
        vaultTokenDest = tokenDest;
    } else {
        vaultTokenDest = vaultTokenAccount.pubKey;
    }

    depositInstructions.push(
        await cVoltSDK.deposit(
            depositAmount,
            depositTokenAccountKey,
            vaultTokenDest,
            undefined,
            depositTokenDecimals
        )
    );

    if (depositTokenMintAddress === WRAPPED_SOL_ADDRESS) {
        const closeWSolIx = Token.createCloseAccountInstruction(
            TOKEN_PROGRAM_ID,
            depositTokenAccountKey,
            wallet.publicKey, // Send any remaining SOL to the owner
            wallet.publicKey,
            []
        );
        depositInstructions.push(closeWSolIx);
    }

    const sProvider = SolanaProvider.load({
      connection: connection,
      sendConnection: connection,
      wallet: wallet,
      opts: {
        commitment: "confirmed",
      },
    });

    const depositTx = new TransactionEnvelope(
      sProvider,
      depositInstructions,
      signers
    );

*/