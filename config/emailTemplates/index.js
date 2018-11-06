function EMAIL_QUERY(data){
    return (`
        ${data}
    `)
}
function EMAIL_FOLLOWUP(data){
    return (`
        ${data}
    `)
}
function EMAIL_PROMOTIONAL_OFFER(data){
    return (`
        promotionaloffer
        ${data}
    `)
}
module.exports = {
    EMAIL_QUERY:EMAIL_QUERY,
    EMAIL_FOLLOWUP:EMAIL_FOLLOWUP,
    EMAIL_PROMOTIONAL_OFFER:EMAIL_PROMOTIONAL_OFFER
}