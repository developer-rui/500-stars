function concat_params(params) {
    var result = "";
    var separator = "";
    for (var p in params) {
        result += (separator + p + "=" + params[p]);
        separator = "&";
    }
    return result;
}

function ajax_get(url, params, fonction, asynchronous = true) {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        fonction(this.responseText);
    }
    xhttp.open("GET", url + (params ? "?" + concat_params(params) : ""), asynchronous);
    xhttp.send();
}

function ajax_post(url, params, fonction, asynchronous = true) {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        fonction(this.responseText);
    }
    xhttp.open("POST", url, asynchronous);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(concat_params(params));
}