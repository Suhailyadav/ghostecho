class ApiResponse {
  constructor (statusCode, data, message='Success') {
    this.statusCode = statusCode < 400;
    this.success = true;
    this.message = message;
    this.data = data;
  }
}

export default ApiResponse;