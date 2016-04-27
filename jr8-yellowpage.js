/**
 *
 * 根据jello的server.conf 自动生成url黄页 并deploy到tomcat
 * liuliang02@58ganji.com
 * jiajianrong@58.com
 * 2016-04-22
 *
 **/




var fs = require('fs'),
    serverConf = process.cwd() + '/server.conf',
    indexVm = fis.project.getTempPath() + '/www/WEB-INF/views/index.vm',
    allItems = [];





function readServerConf() {
    
    if (!fs.existsSync(serverConf))
        return;
    
    var data = fs.readFileSync(serverConf, {'encoding': 'utf8'});
    
    if ( !data || !data.trim().length )
        return;
    
    
    var rows = data.split('\n');
    
    rows.forEach(function(row){
        
        row = row.trim();
        
        if (/^#+/.test(row)) {
            allItems.push(row);
            return;
        }
           
        if (/^rewrite\s.+\.vm$/i.test(row)) {
            var tmpArr = row.split(/\s+/);
            allItems.push({
                url: tmpArr[1].replace(/(\^\\?)|\$/g, ''),
                vm:  tmpArr[2]
            });
            return;
        }
        
    });
}




function writeIndexVm() {
    
    allItems = allItems.map(function(item){
        if (typeof item == 'string')
            item = '<p>' + item + '</p>';
        else {
            item = '<a href="' + item.url + '">' + item.vm + '</a>';
        }
        return item;
    });
    
    var str = '<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no"></head><style>a{display:block;}p{background-color:#08c;color:#fff;padding:20px;}</style>'
              + allItems.join('\n');
    
    
    /*
     * 需处理if exists
     *
    fs.open( indexVm, 'w', function(err, fd) {
        if (err) {
            throw err;
        }
        fs.write( fd, str, 'utf8', function(err, written, string) {
            if (err) {
                throw err;
            }
            fs.close(fd, function(err) {
                if (err) {
                    throw err;
                }
            })
        })
    });
    */
    
    fs.writeFile(indexVm, str, function(err){
        err && console.log('err occurs when outputting yellopage: ', err);
    });
}





exports.run = function() {
    readServerConf();
    writeIndexVm();
}