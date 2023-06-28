let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function showTime() {
    const date = new Date();
    return date.getHours() +"Hrs: "+date.getMinutes()+"Mins: "+date.getSeconds()+"Secs: ";
}

function makeAJAXCall(methodType, url, callback, async=true, data=null) {
    let xhr = new XMLHttpRequest();
    //event listener
    xhr.onreadystatechange = function() {
        //console.log(methodType+" State changed called at: "+showTime()+" Ready State: "+xhr.readyState+" Status: "+xhr.status);
        if (xhr.status === 4){
            if (xhr.readyState === 200 || xhr.readyState === 201){
                callback(xhr.responseText);
            }
            else if (xhr.status >= 400){
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
}

//AJAX GET call
let getURL = "http://localhost:3000/employee";
function getUserDetails(data) {
    console.log("Get user data at: "+showTime() +" Data: "+data);
}
makeAJAXCall("GET", getURL, getUserDetails, true);
console.log("Made GET AJAX call to the server at: "+showTime());

//AJAX DELETE call
let deleteURL = "http://localhost:3000/employee/4";
function userDeleted(data) {
    console.log("User deleted at: "+showTime() +" Data: "+data);
}
makeAJAXCall("DELETE", deleteURL, userDeleted, false);
console.log("Made DELETE AJAX call to the server at: "+showTime());

//AJAX POST call
let postURL = "http://localhost:3000/employee/";
let empData = { "name":"Brook","salary":3000 };
function userAdded(data) {
    console.log("User added at: "+showTime() +" Data: "+data);
}
makeAJAXCall("POST", postURL, userAdded, true, empData);
console.log("Made POST AJAX call to the server at: "+showTime());