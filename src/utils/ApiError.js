class ApiError extends error {
    constructor(
        statuscode,
        message = "something went wrong",
        error = [],
        statck = ""
    ) {
        super(message)
        this.statuscode = statuscode
        this.data = null
        this.message = message
        this.success = false
        this.errors = errors

        if (statck) {
            this.statck = statck
        } else {
            error.capturestacktrace(this, this.constructor)
        }
    }
}

export { ApiError }