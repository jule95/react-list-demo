import * as birthday from "./birthday";

export function validateName(name)
{
    return name.length >= 4;
}

export function validateEmail(email)
{
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return regex.test(email) && email.length <= 30;
}

export function validatePhone(phone)
{
    return phone.length > 0;
}

export function validateDob(dob)
{
    const regex = /^([0-2][0-9]|(3)[0-1])(\.)(((0)[0-9])|((1)[0-2]))(\.)\d{4}$/i;

    return regex.test(dob) && (birthday.getAge(dob) >= 18);
}