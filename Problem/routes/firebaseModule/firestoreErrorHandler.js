
var statusCodeData = 500;
var endData = "";

module.exports = function (err,callback) {
    if(300 <= parseInt(err.substr(0,3)) && parseInt(err.substr(0,3)) < 500){
        statusCodeData = parseInt(err.substr(0,3)) ;
    }
    console.log(`{
        "statusCode" : ${statusCodeData},
        "error" : "${err.substr(4,err.length-4)}"
    }`);
    callback({
        statusCodeData: () => (statusCodeData),
        endData: () => (`{
            "statusCode" : ${statusCodeData},
            "error" : "${err.substr(4,err.length-4)}"
        }`)
    })
}