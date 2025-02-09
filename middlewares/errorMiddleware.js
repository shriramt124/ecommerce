
const errorHandler = (err,req,res,next) => {
// Suggested code may be subject to a license. Learn more: ~LicenseLog:580838780.
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message:err.message,
        stack:process.env.NODE_ENV === "production" ? null : err.stack
    })
}

export default errorHandler; 
