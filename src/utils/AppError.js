class AppError {
  message;
  statusCode;

  constructor(message, statusCode = 400) {
    // repassando as info que chegar do client p/ o escopo global:
    this.message = message;
    this.statusCode = statusCode;

  }
}

module.exports = AppError;