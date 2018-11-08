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

    let headingMail = data.config.mailHead;
    let images = data.config.images || [];
    let imagesHTML = images.map(image=>{
        return (
            `<img src="${image}" width="700px" height="500px"/>`
        )
    }).join(' ');



    return (`
        promotionaloffer
        <h2>${headingMail}</h2>
        <image src="${data.logo}"/>
        <h3>Images here</h3>
        ${imagesHTML}
        <a href="${data.target}">
        <button>Target Link</button>
        </a>
        `)
}
module.exports = {
    EMAIL_QUERY:EMAIL_QUERY,
    EMAIL_FOLLOWUP:EMAIL_FOLLOWUP,
    EMAIL_PROMOTIONAL_OFFER:EMAIL_PROMOTIONAL_OFFER
}