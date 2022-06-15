import { homedir } from 'os';
import { readFileSync } from 'fs';

import * as anchor from '@project-serum/anchor';
import { Connection } from '@solana/web3.js';
import { ChanceDapp, IDL } from "../../../../target/types/chance_dapp";

import { anchorConfiguration } from '@anchor/configs/AnchorConfirguration';

export class ProgramProvider {
  private program: anchor.Program<ChanceDapp>;
  private programId: anchor.web3.PublicKey;

  constructor() {
    anchor.setProvider(anchor.AnchorProvider.env());
    
    this.program = anchor.workspace.ChanceDapp;
    this.programId = this.program.programId;
  }

  async init() {
    console.log('programId', this.programId);

    await this.program.methods.initialize().rpc();
  }

  getProgramId(): anchor.web3.PublicKey {
    return this.program.programId;
  }

  async getBalance(): Promise<number> {
    const connection: Connection = new Connection('http://localhost:8899');
    const balance: number = await connection.getBalance(this.program.programId);

    return balance;
  }
}