const pick = (object, props)=>{


    let newObject = {};

    props.forEach(prop=>{
		if(object[prop]!==undefined)
        	newObject[prop] = object[prop];
       

        
    });

    return newObject;
};
//checks for empty obj,string,undefined,null
//checks for empty obj,string,undefined,null
const isEmpty = value =>
  value === undefined ||
  value === null ||
  (typeof value === 'object' && Object.keys(value).length === 0) ||
  (typeof value === 'string' && value.trim().length === 0);


  const trimAllSpaces = (value) =>  value.split(' ').join('')
module.exports = {
    pick:pick,
    isEmpty:isEmpty,
    trimAllSpaces : trimAllSpaces
}