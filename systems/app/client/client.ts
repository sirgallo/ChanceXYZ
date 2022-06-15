// client.js is used to introduce the reader to generating clients from IDLs.
// It is not expected users directly test with this example. For a more
// ergonomic example, see `tests/basic-0.js` in this workspace.

import anchor from '@project-serum/anchor';
import { readFileSync } from 'fs';

// Configure the local cluster.
anchor.setProvider(anchor.AnchorProvider.local());

async function main() {
  console.log('Running client.');
  // #region main
  // Read the generated IDL.
  const idl = JSON.parse(readFileSync('/home/sirgallo/Documents/Projects/chanceDapp/target/idl/chance_dapp.json', 'utf8'));
  console.log('idl', idl);

  // Address of the deployed program.
  const programId = new anchor.web3.PublicKey('/home/sirgallo/Documents/Projects/chanceDapp/target/deploy/chance_dapp-keypair.json');
  console.log('programId', programId)

  // Generate the program client from IDL.
  const program = new anchor.Program(idl, programId);
}

main()
  .then(() => console.log('Success'));