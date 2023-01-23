const searchParams = new URLSearchParams(window.location.search);
const uid = searchParams.get("uid");
console.log(uid);
if (uid) {
    document.cookie = `uid=${uid};path=/`;
    console.log("Cookie set");
}

function getCookie(name) {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");
    if (parts.length === 2) {
        return parts.pop().split(";").shift();
    }
}

if (window.location.href.includes("order-received")) {
    const uid = getCookie("uid");
    let partner = getCookie("partner");
    if (uid) {
        var xhr = new XMLHttpRequest();
        var url = "http://localhost/wpdemo/wp-admin/admin-ajax.php?action=purchase_complete";
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                // unset Cookies.
                document.cookie = "partner=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                document.cookie = "gclid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                document.cookie = "campid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                document.cookie = "uid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                document.cookie = "uniqueid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            }
        };
        var data = JSON.stringify({ action: "purchase_complete", uid: uid, partnerName: partner, message: "purchased" });
        xhr.send(data);
    }
}
