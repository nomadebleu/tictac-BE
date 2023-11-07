function checkBody(body,array){
    //verifie que le nom des clés correspond à ce qu'on veut
    for(const element of array){
        if(!body[element]||body[element] === '') {
            return false;
        }
    }
    return  true
    
}
module.exports = {checkBody};