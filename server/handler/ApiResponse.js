const ApiResponse = (res, StatusCode, Message, Error = null, data = null) => {
    const response = {
        status: StatusCode,
        message: Message,
        error: Error,
        data: data
    };
    return res.status(StatusCode).json(response);
};

export {ApiResponse}