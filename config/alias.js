const path = require('path');

const componentsPath = path.join(__dirname, '../src/components');

module.exports = {
    utils: path.join(__dirname, '../src/utils/'),
    helpers: path.join(__dirname, '../src/utils/helpers'),
    globalMap: path.join(__dirname, '../src/utils/globalMap'),
};
