var fis = module.exports = require('jello');

fis.require.prefixes.unshift('jello');

fis.cli.name = 'jr8';
fis.cli.info = fis.util.readJSON(__dirname + '/package.json');





var ppArr = fis.config.get('modules.postpackager') || [];


/\bpublish\b/i.test(process.title) && ppArr.push('vmparse');
/\bperformance\b/i.test(process.title) && ppArr.push('performance-framework');

// performance-framework һ��Ҫ�� require-framework ֮ǰ����Ϊ���߶��õ���vm����
ppArr.push('require-framework');



fis.config.set('modules.postpackager', ppArr);

/**
fis.config.merge({
    modules: {
        postpackager: ppArr
    }
});
**/