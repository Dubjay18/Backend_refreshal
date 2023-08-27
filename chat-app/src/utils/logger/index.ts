/**
 * Logs data to the console with a timestamp and severity level.
 * @param data - The data to be logged. Can be a string or an Error object.
 * @param severity - The severity level of the log. Can be "Error", "Warning", or "Normal". Defaults to "Normal".
 */
export default function JLogger(
  data: string | Error,
  severity: "Error" | "Warning" | "Normal" = "Normal"
): void {
  // Get the current time
  const currentTime = new Date();

  // Log the timestamp and severity level
  console.log(
    `[${currentTime.toISOString()}] [${severity}]`
  );

  // Log the data
  console.log(
    data?.toString() ?? "Error: data not passed to logger"
  );

  // Log the end of the comment
  console.log("<-arigato");
}
