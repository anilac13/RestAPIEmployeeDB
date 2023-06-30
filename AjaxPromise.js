let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function showTime() {
    const date = new Date();
    return date.getHours() +"Hrs: "+date.getMinutes()+"Mins: "+date.getSeconds()+"Secs: ";
}

function makePromiseCall(methodType, url, async=true, data=null) {
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest();
    //event listener
    xhr.onreadystatechange = function() {
        if (xhr.status === 4){
            if (xhr.readyState === 200 || xhr.readyState === 201){
                //callback(xhr.responseText);
                resolve(xhr.responseText);
            }
            else if (xhr.status >= 400){
                reject({
                    status: xhr.status,
                    statusText: xhr.statusText
                });
                console.log("Handle 400 client error or 500 server error at: "+showTime());
            }
        }
    }
    xhr.open(methodType, url, async);
    if (data) {
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(data));
    }
    else xhr.send();
    console.log(methodType+" request sent to the server at: "+showTime());
    });
    
}

//AJAX Promise GET call
let getURL = "http://localhost:3000/employee";
makePromiseCall("GET", getURL, true)
    .then(responseText => {
        console.log("Get user data: "+responseText)
    })
    .catch(error => console.log("Get error status: "+JSON.stringify(error)));
console.log("Made GET AJAX call to sever at: "+showTime());