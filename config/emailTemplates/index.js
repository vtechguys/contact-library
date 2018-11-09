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

    let headingMail = data.config?data.config.mailHead:"Mail Heading";
    let images = data.config?data.config.images :[];
    let imagesHTML = images.map(image=>{
        return (
            `<img src="${image}" width="700px" height="500px"/>`
        )
    }).join(' ');

    let text = data.text;

    return (`
        promotionaloffer
        <h2>${headingMail}</h2>
        <image src="${data.logo}"/>
        <h3>Images here</h3>
        ${imagesHTML}
        <a href="${data.target}">
        ${text}
        <button>Target Link</button>
        </a>
        `)
}

function EMAIL_OTP(data){

    return `
        ${data.text}
    
    `
}
module.exports = {
    EMAIL_QUERY:EMAIL_QUERY,
    EMAIL_FOLLOWUP:EMAIL_FOLLOWUP,
    EMAIL_PROMOTIONAL_OFFER:EMAIL_PROMOTIONAL_OFFER
}