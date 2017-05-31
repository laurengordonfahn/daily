import $ from "jquery";

//export for others scripts to use
// window.$ = $;

export function signUp(email1, email2, password1, password2) {
    return $.ajax({
        url: "/signUp",
        type: "POST",
        dataType: "json",
        cache: false,
        data: {
            email1: email1,
            email2: email2,
            password1: password1,
            password2: password2
        },
        success: (response) => {
            window.sessionStorage.setItem("accessToken", response["access_token"]);
        }
    });
}

export function signIn(email, password) {
    return $.ajax({
        url: "/signIn",
        type: "POST",
        dataType: "json",
        cache: false,
        data: {
            email: email,
            password: password
        },
        success: (response) => {
            window.sessionStorage.setItem("accessToken", response["access_token"]);
        }
    });
}

export function signOut() {
    const accessToken = window.sessionStorage.getItem("accessToken")
    window.sessionStorage.clear();
    return $.ajax({
        url: "/signOut",
        type: "DELETE",
        cache: false,
        data: {
            access_token: accessToken
        }
    });
}

export function dateContent(month, year) {
    const accessToken = window.sessionStorage.getItem("accessToken")
    return $.ajax({
        url: "/month/content",
        type: "POST",
        dataType: "json",
        cache: false,
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "JWT " + accessToken);
        },
        data: {
            month: month,
            year: year
        }
    });
}

export function dateRange() {
    const accessToken = window.sessionStorage.getItem('accessToken');
    return $.ajax({
        url: "/calendar/options",
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "JWT " + accessToken);
        },
        cache: false
    });
}

export function dateArray(month, year) {
    const accessToken = window.sessionStorage.getItem("accessToken")
    return $.ajax({
        url: "/month/days",
        dataType: "json",
        data: { month: month, year: year },
        cache: false,
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "JWT " + accessToken);
        }
    });
}

export function colorArr() {
    const accessToken = window.sessionStorage.getItem("accessToken")
    return $.ajax({
        url: "/calendar/color",
        cache: false,
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "JWT " + accessToken);
        }
    });
}

export function updateAdjDB(dayDate, newVal, ElemName) {
    const accessToken = window.sessionStorage.getItem('accessToken');
    return $.ajax({
        url: "/month/adj",
        dataType: "json",
        type: "post",
        cache: false,
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "JWT " + accessToken);
        },
        // headers: {"Authorization": "JWT " + accessToken},
        data: { dayDate: dayDate, newVal: newVal, ElemName: ElemName },
        success: (response) => {
            //window.sessionStorage.setItem("accessToken", response["access_token"]);
        }
    });
}

export function handleColorChangeDB(colorId, dayDate) {
    const accessToken = window.sessionStorage.getItem("accessToken") 
    return $.ajax({
        url: "/month/color",
        dataType: "json",
        type: "post",
        cache: false,
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "JWT " + accessToken);
        },
        data: { dayDate: dayDate, colorId: colorId }
    });
}


export function colorChart(colorOrder) {
    const accessToken = window.sessionStorage.getItem("accessToken")
    return $.ajax({
        url: "/calendar/chart",
        type: "get",
        dataType: "json",
        cache: false,
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "JWT " + accessToken);
        },
        data: { colorOrder: colorOrder}
    });
}
