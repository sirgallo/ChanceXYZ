import { 
  ServerConfiguration,
  IServerConfiguration
} from '@core/baseServer/core/models/ServerConfiguration'

export const serverConfiguration: ServerConfiguration<Record<string, IServerConfiguration>> = {
  anchor: {
    port: 2345,
    name: 'Anchor API',
    numOfCpus: 4,
    version: '0.1'
  }
}