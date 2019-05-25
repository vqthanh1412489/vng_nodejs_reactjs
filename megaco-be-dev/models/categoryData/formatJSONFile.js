const fs = require('fs')
function formatJson(jsonFile){
    fs.readFile(jsonFile, 'utf8', (err, data)=>{
        jsonString = JSON.parse(data);
        jsonString = jsonString.data;
        // delete jsonString.data;
        // jsonString.delete(jsonString.children);
        for (var i in jsonString.data){
        delete jsonString.data[i].children;
        for(var j in jsonString.data[i].children)
        delete jsonString.data[i].children[j];

        }
        fs.appendFile('jsonparse.json', JSON.stringify(jsonString), function (err) {
            if (err) throw err;
            console.log('Saved!');
          });


    })
    
}

formatJson('./categories.json');