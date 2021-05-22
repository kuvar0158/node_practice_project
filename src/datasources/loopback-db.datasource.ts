import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'loopback_db',
  connector: 'postgresql',
  url: 'postgres://enterprisedb:12345@localhost:5444/loopback_db',
  host: 'localhost',
  port: 5444,
  user: 'enterprisedb',
  password: '12345',
  database: 'loopback_db'
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class LoopbackDbDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'loopback_db';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.loopback_db', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
