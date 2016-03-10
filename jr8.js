var fis = module.exports = require('jello');

fis.require.prefixes.unshift('jello');

fis.cli.name = 'jr8';
fis.cli.info = fis.util.readJSON(__dirname + '/package.json');









// --------------------------------
// ��ӡ��Ϣ
// --------------------------------
if (/\brelease\b/i.test(process.title)) {

	var IS_PUBLISH     = /\bpublish\b/i.test(process.title);
	var IS_PERFORMANCE = /\bperformance\b/i.test(process.title);

	console.log('IS_PUBLISH    :' + IS_PUBLISH);
	console.log('IS_PERFORMANCE:' + IS_PERFORMANCE);
}










// --------------------------------
// ѹ���Ż�
// --------------------------------
fis.config.merge({
    modules: {
        optimizer: {
            // js��׺�ļ��ᾭ��fis-optimizer-uglify-js�����ѹ���Ż�
            js: 'uglify-js',
            css: 'clean-css' //, png : 'png-compressor'
        }
    },
    // ʹ��pngquant����ѹ����pngͼƬѹ�����Ϊpng8
    // fis.config.set('settings.optimizer.png-compressor.type', 'pngquant');
    settings: {
        optimizer: {
            'png-compressor': {
                type: 'pngquant'
            }
        }
    }
});









// --------------------------------
// js ģ��֧��
// --------------------------------
fis.config.set('modules.parser.tmpl', 'utc');
//fis.config.set('roadmap.ext.tmpl', 'js');
//fis.config.set('roadmap.ext.tpl', 'js');
//fis.config.merge({
//  settings: {
//      parser : {
//          'utc': {
//              variable: 'obj'
//          }
//      }
//  }
//});









// --------------------------------
// postpackager���
// --------------------------------

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