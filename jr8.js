var fis = module.exports = require('jello');

fis.require.prefixes.unshift('jello');

fis.cli.name = 'jr8';
fis.cli.info = fis.util.readJSON(__dirname + '/package.json');





var ppArr = fis.config.get('modules.postpackager') || [];


/\bpublish\b/i.test(process.title) && ppArr.push('vmparse');
/\bperformance\b/i.test(process.title) && ppArr.push('performance-framework');

// performance-framework 一定要在 require-framework 之前，因为二者都用到了vm钩子
ppArr.push('require-framework');



fis.config.set('modules.postpackager', ppArr);

/**
fis.config.merge({
    modules: {
        postpackager: ppArr
    }
});
**/