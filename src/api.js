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
        }
    });
}

export function signOut() {
    return $.ajax({
        url: "/signOut",
        type: "DELETE",
        cache: false
    });
}

export function dateContent(month, year) {
    return $.ajax({
        url: "/month/content",
        type: "POST",
        dataType: "json",
        cache: false,
        data: {
            month: month,
            year: year
        }
    });
}

export function dateRange() {
    return $.ajax({
        url: "/calendar/options",
        cache: false
    });
}

export function dateArray(month, year) {
    return $.ajax({
        url: "/month/days",
        dataType: "json",
        data: { month: month, year: year },
        cache: false
    });
}

export function colorArr() {
    return $.ajax({
        url: "/calendar/color",
        cache: false
    });
}

export function updateAdjDB(dayDate, newVal, ElemName) {
    return $.ajax({
        url: "/month/adj",
        dataType: "json",
        type: "post",
        cache: false,
        data: { dayDate: dayDate, newVal: newVal, ElemName: ElemName }
    });
}

export function handleColorChangeDB(colorId, dayDate) {
    return $.ajax({
        url: "/month/color",
        dataType: "json",
        type: "post",
        cache: false,
        data: { dayDate: dayDate, colorId: colorId }
    });
}


export function colorChart(colorOrder) {
    return $.ajax({
        url: "/calendar/chart",
        type: "get",
        dataType: "json",
        cache: false,
        data: { colorOrder: colorOrder}
    });
}