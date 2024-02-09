class ApiResponse {
    constructor(statusCodse, data, message = "success") {
        this.statusCodse = statusCodse
        this.data = data
        this.message = message
        this.success = statusCodse < 400
    }
}