module.exports = {
  apps: [
    {
      name: 'frontend',
      cwd: './frontend',
      script: 'npm',
      args: 'start'
    },
    {
      name: 'backend',
      cwd: './backend',
      script: 'npm',
      args: 'start'
    }
  ]
}; 