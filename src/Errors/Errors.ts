export class ApiError {
    status:number;
    message:string;
    constructor(status:number,message:string) {
    this.status = status;
    this.message = message;
    }
    public static InternalError(message:string) {
    return new ApiError(500,message);
    }
    public static NotFound(message:string) {
    return new ApiError(404,message);
    }
    public static BadRequest(message:string) {
    return new ApiError(400,message);
    }
    public static UnAuthorized(message:string) {
    return new ApiError(403,message); 
    }
    public static Required(message:string) {
    return new ApiError(402,message);
    }
}