function makePromiseCall(methodType, url, async=true, data=null) {
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest();
    //event listener
    xhr.onload = function() {
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
    xhr.onerror = function() {
        reject({
            status: this.status,
            statusText: xhttp.statusText
        });
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