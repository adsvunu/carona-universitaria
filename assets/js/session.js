let session = sessionStorage.getItem("user");

if (!session && window.location.pathname !== "/") {
    window.location.href = "/";
}

var setSession = (user) => {
    sessionStorage.setItem("user", JSON.stringify(user));
}