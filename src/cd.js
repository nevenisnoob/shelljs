var fs = require('fs');
var common = require('./common');

//@
//@ ### cd('dir')
//@ Changes to directory `dir` for the duration of the script
function _cd(options, dir) {
  if (!dir)
    common.error('directory not specified');

  if (dir === '-') {
    if (!common.state.previousDir)
      common.error('could not find previous directory');
    else
      dir = common.state.previousDir;
  }

  if (!fs.existsSync(dir))
    common.error('no such file or directory: ' + dir);

  if (!fs.statSync(dir).isDirectory())
    common.error('not a directory: ' + dir);

  common.state.previousDir = process.cwd();
  process.chdir(dir);
}
module.exports = _cd;
