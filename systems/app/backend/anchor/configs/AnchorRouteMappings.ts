import { ROUTE, STATUSOK, INFO } from '@core/models/ILog'
import { IBaseRoute } from '@core/baseServer/core/models/IRouteMappings'

export const anchorRouteMappings: Record<string, IBaseRoute>= {
  anchor: {
    name: '/anchor',
    subRouteMapping: {
      getBalance: {
        name: '/getbalance',
        customConsoleMessages: [
          {
            1: { 
              text: '/getbalance', 
              color: ROUTE 
            },
            2: { 
              text: '200', 
              color: STATUSOK 
            },
            3: { 
              text: 'get balance succss...', 
              color: INFO 
            }
          }
        ]
      }
    }
  }
}