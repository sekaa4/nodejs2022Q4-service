export default () => ({
  PORT_API: parseInt(process.env.PORT) ?? 4000,
  MAX_FILE_SIZE_API: parseInt(process.env.MAX_FILE_SIZE) ?? 48,
  LOG_LEVELS_API: parseInt(process.env.LOG_LEVELS) ?? 4,
});
