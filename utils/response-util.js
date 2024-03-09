exports.success = async (req, res, data) => {
    console.log('---response util---', data)
    const successResponse = {
        "code": 200,
        "message": 'Success',
        "data": data
    }
    res.status(successResponse.code).send(successResponse);
}

exports.internalServerError = async (req, res, error) => {
    console.error('---response error---', error)
    const errorResponse = {
        "code": 500,
        "message": "Internal Server Error",
        "error": "Unexpected error has occured in the server"
    }

    res.status(errorResponse.code).send(errorResponse);
}

exports.unauthorized = async (req, res, error) => {
    console.error('---unauthorized error---', error)
    const errorResponse = {
        "code": 401,
        "message": "Unauthorized",
        "error": error
    }

    res.status(errorResponse.code).send(errorResponse);
}