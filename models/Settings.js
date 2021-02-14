const { Schema , model } = require('mongoose');

const SettingsSchema = Schema({

formularios:{
    type: Boolean,
    default:true,
}

})


module.exports = model('Settings', SettingsSchema);