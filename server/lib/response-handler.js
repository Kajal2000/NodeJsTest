// const language_marathi = require('../../language/marathi.json');

function responseStructure(data, lang) {
    
       if(lang === 'mr'){
        for (let key in data.data) {
       
            for (let index in data.data[key]){
                console.log(data.data[key][index].name);     
                data.data[key][index].name = language_marathi[data.data[key][index].name]
            }
        }
       }

    var ref, ref1, ref2, ref3;
    return {
        success: (ref = data.success) != null ? ref : false,
        data: (ref1 = data.data) != null ? ref1 : [],
        count: (ref2 = data.count) != null ? ref2 : 0,
        error: (ref3 = data.error) != null ? ref3 : []
    };
}

module.exports = {
    getResponse(data, lang) {
        data.success = true;
        return responseStructure(data, lang);
    },
    createResponse(data) {
        data.success = true;
        return responseStructure(data);
    },
    errorResponse(error) {
        error.success = false;
        return responseStructure(error);
    }
};