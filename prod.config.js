module.exports = {
  apps: [
    {
      name: 'city_pay-report',
      cwd: '/opt/kabbik-services/kabbik-city_pay-report',
      "instances" : "1",
      script: 'npm',
      args: 'start',
      env: {
        NODE_ENV: 'production',
	PORT: 8087

      },
    },
  ],
};
