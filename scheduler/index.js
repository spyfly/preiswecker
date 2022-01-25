const Bree = require('bree');

const bree = new Bree({
    jobs: [
      {
        name: 'priceCheck',
        timeout: '5s',
        interval: '5m'
        // this is unnecessary but shows you can pass a Number (ms)
        // interval: ms('5m')
      }
    ]
  });
  
  // start all jobs (this is the equivalent of reloading a crontab):
  bree.start();