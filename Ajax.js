let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function showTime() {
    const date = new Date();
    return date.getHours() +"Hrs: "+date.getMinutes()+"Mins: "+date.getSeconds()+"Secs: ";
}

function makeAJAXCall(methodType, url, callback, async=true, data=null) {
    let xhr = new XMLHttpRequest();
    //event listener
    xhr.onreadystatechange = function() {
        //console.log(methodType+" State change called at: "+showTime()+" Rs: "+xhr.readyState+" Status: "+xhr.Status);
        if (xhr.Status === 4){
            if (xhr.readyState == 200 || xhr.readyState == 201){
                callback(xhr.responseText);
            }
            else if (xhr.Status == 400){
                console.log("Handle 400 client errors or 500 server errors")
            }
        }
    }
    xhr.open(methodType, url, async);
    xhr.send();
    console.log(methodType+" request sent to the server at: "+showTime());
}

let getURL = "http://localhost:3000/employee"

function getUserDetails(data) {
    console.log("Get user data at: "+showTime() +" Data: "+data);
}
makeAJAXCall("GET", getURL, getUserDetails, true);
console.log("Made GET AJAX call to the server at: "+showTime());