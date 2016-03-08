var fis = module.exports = require('jello');

fis.require.prefixes.unshift('jello');

fis.cli.name = 'jr8';
fis.cli.info = fis.util.readJSON(__dirname + '/package.json');




var ppArr = fis.config.get('modules.postpackager') || [];
ppArr.push('vmparse');
ppArr.push('require-framework');
fis.config.set('modules.postpackager', ppArr);

/*
fis.config.merge({
    modules: {
        postpackager: ['vmparse','require-framework']
    }
});
*/