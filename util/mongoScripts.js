const Creator = require("../models/creator");

exports.updateCreatorDoc = function(){
    Creator.updateMany({}, {confirmed: false, premium: false})
    .then(res => {
        console.log('n',res.n);
        console.log('nmod', res.nModified);
        console.log('ok', res.ok);
    })
    .catch(err => {
        console.log(err);
    })
}
