const PORT =
  typeof process.env.PORT === "string" ? parseInt(process.env.PORT, 10) : 3000;

export default () => ({
  port: PORT,
});
