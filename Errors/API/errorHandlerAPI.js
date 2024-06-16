// Error handling middleware
function errorHandlerAPI(error, req, res, next) {
  console.log(req.header);
  console.log(error);

  // Send a standardize error response
  res.status(error.status || 500).json({
    error: error.name || "Internal Service Failure",
    message: error.message || "An Unexpected Error Occurred.",
  });
}

module.exports = errorHandlerAPI;
