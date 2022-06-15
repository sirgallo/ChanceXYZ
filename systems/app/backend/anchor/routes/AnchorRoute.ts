import { Request, Response, NextFunction } from 'express';

import { BaseRoute } from '@core/baseServer/core/BaseRoute';
import { LogProvider } from '@core/providers/LogProvider';

import { ProgramProvider } from '@anchor/providers/ProgramProvider';
import { VoltProvider } from '@anchor/providers/VoltProvider';

import { anchorRouteMappings } from '@anchor/configs/AnchorRouteMappings';

import { 
  AnchorBasicInfoResponse
} from '@anchor/models/AnchorRequest';

const NAME = 'Anchor Route'

export class AnchorRoute extends BaseRoute {
  name = NAME;
  
  private log: LogProvider = new LogProvider(NAME);

  constructor(rootpath: string, private programProvider: ProgramProvider) {
    super(rootpath);
    this.log.initFileLogger();

    this.router.get(anchorRouteMappings.anchor.subRouteMapping.getBalance.name, this.getBalance.bind(this));
  }

  async getBalance(req: Request, res: Response, next: NextFunction) {
    try {
      const balance = await this.programProvider.getBalance();
      console.log('balance', balance);

      this.log.custom(anchorRouteMappings.anchor.subRouteMapping.getBalance.customConsoleMessages[0], true);

      res
        .status(200)
        .send({ status: 'Get Pool Balance Success', balance: balance });
    } catch (err) {
      res
        .status(404)
        .send({ err: err.toString(), message: 'Error in Login Route' })
    }
  }
}