export const secureServerListen = (
  PORT: number | string,
  server: any
): void => {
  server.listen(PORT, (): void => {
    console.log("Server is up on port " + PORT);
  });
};
