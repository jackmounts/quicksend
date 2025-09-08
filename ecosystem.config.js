module.exports = {
  apps: [
    {
      name: "quicksend",
      script: "npm",
      args: "host",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
      instances: "max",
      exec_mode: "fork",
      watch: false,
      max_memory_restart: "500M",
      error_file: "./logs/err.log",
      out_file: "./logs/out.log",
      merge_logs: true,
    },
  ],
};
