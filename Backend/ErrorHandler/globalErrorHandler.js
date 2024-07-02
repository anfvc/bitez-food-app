export function globalErrorHandler(error, req, res, next) {
  console.log("Error handler has been activated...");
  res.status(error.status || 400).send({
    error: {
      message: error.message,
      status: error.status,
    },
  });
}
