import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { ChanceDapp } from "../target/types/chance_dapp";

describe('chanceDapp', () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.local());

  const program = anchor.workspace.ChanceDapp as Program<ChanceDapp>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize().rpc();
    console.log("Your transaction signature", tx);
  });


});
