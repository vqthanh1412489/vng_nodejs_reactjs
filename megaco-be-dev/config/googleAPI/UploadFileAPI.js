const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');


const SCOPES = ['https://www.googleapis.com/auth/drive.metadata'];

const TOKEN_PATH = 'token.json';

// will get token  and authorize from credentials.json file;
function authorize(credentials, callback) {
    const {client_secret, client_id, redirect_uris} = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
        oAuth2Client.setCredentials(JSON.parse(token));
        callback(oAuth2Client);
    });
}





// After 2 steps to authorize and generate a token -> can upload or download file like this:
fs.readFile('credentials.json', (err, content) => { // read content on credentials.json
    if (err) return console.log('Error loading client secret file:', err);
    // Authorize a client with credentials, then call the Google Drive API.
    authorize(JSON.parse(content), downloadFile); // Then give it to authorize
});



function listFiles(auth) {
    const drive = google.drive({version: 'v3', auth});
    drive.files.list({
        pageSize: 10,
        fields: 'nextPageToken, files(id, name)',
    }, (err, res) => {
        if (err) return console.log('The API returned an error: ' + err);
        const files = res.data.files;
        if (files.length) {
            console.log('Files:');
            files.map((file) => {
                console.log(`${file.name} (${file.id})`);
            });
        } else {
            console.log('No files found.');
        }
    });
}




function uploadSingleFile(auth) {
    const drive = google.drive({version: 'v3', auth});
    drive.files.create({
        requestBody: {
            name: 'Test1',
        },
        media: {
            body: 'Test1.txt',
            mimeType: 'text/plain'
        },
    }, (err, res) => {
        if (err) return console.log('The API returned an error: ' + err);
        else
            console.log('Success upload file with FileID: '+ res);
    });
}

function uploadMutilFile(auth) {
    const drive = google.drive({version: 'v3', auth});

    const linkForldel = 'folderTestCreate/Test1.txt';
    var forlderName = getFolder(linkForldel);

    drive.files.create({
        resource:{
            'name': forlderName,
            'mimeType': 'application/vnd.google-apps.folder'

        }
    }, function (err, forlder) {
        if (err) return console.log('The API returned an error: ' + err);
    else{
        const idForder = forlder.data.id;
        // console.log(forlder);
        // const idForder = JSON.parse(forlder).id;
            console.log( 'forlderId: '+ idForder);
            drive.files.create({
                uploadType: 'multipart',
                requestBody: {
                    name: 'Test1',
                    parents: [idForder]
                },
                media: {
                    body: fs.createReadStream('Test1.txt'),
                    mimeType: 'text/plain'

                },
                uploadType:'multipart'
            }, (err, res) => {
                if (err) return console.log('The API returned an error: ' + err);
                else
                    console.log('Success upload file with FileID: '+ res);
            });

        }
    })


}
function downloadFile(auth){
    const drive = google.drive({version: 'v3', auth});
    var fileId = '1taA8vYv3MgihdLF04k4aQA5h5l5wyA4O';
    var dest = fs.createWriteStream('test/testAPI.txt');
    // drive.files.get({
    //   fileId: fileId,
    //   alt: 'text/plain'
    // }).on('end', function () {
    //       console.log('Done');
    //     })
    //     .on('error', function (err) {
    //       console.log('Error during download', err);
    //     })
    //     .pipe(dest);

    drive.files.export({
      fileId: fileId,
      mimeType: 'text/plain',

    }, function(err, res){
        if(err) console.log(err);
            res.data.on('error', err => {
                console.log(err);
            }).on('end', ()=>{
                console.log('done');
            })
            .pipe(dest);
    })

}



function getFolder(link) {
    var Str = "";
    for(var i =0; i< link.length; i++){
        if(link[i] ==='/')
            return Str;
        Str+= link[i];
    }
}