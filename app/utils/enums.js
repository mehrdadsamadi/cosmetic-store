const Responses = {
    200: "عملیات با موفقیت انجام شد",
    201: "با موفقیت ایجاد شد",
    403: "شما دسترسی لازم به این بخش را ندارید",
    404: "یافت نشد",
    500: "خطای سرور",
}

Object.freeze(Responses)

module.exports = {
    Responses
}