import { homedir } from 'os';

import { BaseServer } from '@baseServer/core/BaseServer';

import { AnchorRoute } from '@anchor/routes/AnchorRoute';
import { LogProvider } from '@core/providers/LogProvider';

import { ProgramProvider } from '@anchor/providers/ProgramProvider';

import { anchorRouteMappings } from '@anchor/configs/AnchorRouteMappings';

export class InitAnchorServer extends BaseServer {
  private anchorLog: LogProvider = new LogProvider(this.name);
  
  async startServer() {
    try {
      console.log('home', homedir());
      const programProvider = new ProgramProvider();
      //programProvider.init();

      const anchorRoute = new AnchorRoute(anchorRouteMappings.anchor.name, programProvider);
      this.setRoutes([ anchorRoute ]);

      this.run();
    } catch (err) {
      this.anchorLog.error(err);
      throw err;
    }
  }
}