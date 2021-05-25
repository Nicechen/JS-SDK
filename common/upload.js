const request = require('request');
const fs = require('fs');
const md5 = require('md5');
const path = require('path');
const archiver = require('archiver');

const opts = {
  appname: 'webcdn',
  username: 'keiranchen',
  buildpath: 'dist',
  path: '/gmall/sdk/',
  token: '',
};
// 压缩成zip文件
const zipFilePath = `${opts.buildpath}.zip`;

const output = fs.createWriteStream(zipFilePath);
output.on('finish', upload);

const archive = archiver('zip');

archive.on('error', (err) => {
  throw err;
});

archive.pipe(output);
archive.bulk({
  src: '**',
  cwd: path.join(__dirname, `../${opts.buildpath}/`),
  expand: true,
});
archive.finalize();
function upload() {
  const formData = {
    file: fs.createReadStream(zipFilePath),
  };
  const qs = {
    appname: opts.appname,
    user: opts.username,
    filename: opts.buildpath,
    filetype: 'zip',
    filepath: opts.path,
    filesize: (function (filepath) {
      return fs.statSync(filepath).size;
    }(zipFilePath)),
    filemd5: (function (filepath) {
      return md5(fs.readFileSync(filepath)).toLowerCase();
    }(zipFilePath)),
    isunzip: 1,
  };
  console.log('qs', qs);
  request({
    url: 'xxxxxxxxx',
    method: 'POST',
    headers: {
      'X-CDN-Authentication': opts.token,
    },
    // body: data,
    formData,
    qs,

  }, (err, res, body) => {
    // console.log(zipFilePath + ' upload success.');
    err && console.log('error', err);
    body && console.log('res', body);
    fs.unlinkSync(zipFilePath);
  });
}
