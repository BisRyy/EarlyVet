/**
 * Centralized error handler for the microservice
 */
class ErrorHandler {
    /**
     * Handles operational errors in async functions
     * @param {Function} fn - The async function to wrap
     * @returns {Function} - A wrapped function with error handling
     */
    static asyncHandler(fn) {
      return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch((err) => next(err));
      };
    }
  
    /**
     * Logs error details to the console or a monitoring system
     * @param {Error} error - The error object
     */
    static logError(error) {
      console.error(`[${new Date().toISOString()}]`, error.message, error.stack);
    }
  
    /**
     * Sends a formatted error response
     * @param {Error} error - The error object
     * @param {Object} res - The Express response object
     */
    static handleError(error, res) {
      const statusCode = error.statusCode || 500;
      const message = error.message || "Internal Server Error";
  
      res.status(statusCode).json({
        success: false,
        message,
        ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
      });
    }
  
    /**
     * Middleware for handling 404 errors
     * @param {Object} req - The Express request object
     * @param {Object} res - The Express response object
     * @param {Function} next - The Express next middleware function
     */
    static notFoundHandler(req, res, next) {
      const error = new Error(`Not Found - ${req.originalUrl}`);
      error.statusCode = 404;
      next(error);
    }
  
    /**
     * Middleware for handling all other errors
     * @param {Error} error - The error object
     * @param {Object} req - The Express request object
     * @param {Object} res - The Express response object
     * @param {Function} next - The Express next middleware function
     */
    static globalErrorHandler(error, req, res, next) {
      ErrorHandler.logError(error);
      ErrorHandler.handleError(error, res);
    }
  }
  
  module.exports = ErrorHandler;
  