import '../modAlias';

import { serverConfiguration } from '../ServerConfigurations';
import { InitAnchorServer } from '@anchor/InitAnchorServer';

const server = new InitAnchorServer(
  serverConfiguration.anchor.name,
  serverConfiguration.anchor.port,
  serverConfiguration.anchor.version,
  serverConfiguration.anchor.numOfCpus
);

try {
  server.startServer();
} catch (err) { console.log(err); }