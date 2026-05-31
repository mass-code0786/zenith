module.exports = {
  apps: [
    {
      name: "zenith",
      script: "cmd.exe",
      args: "/c npm start -- -p 3001",
      interpreter: "none",
    },
  ],
};
