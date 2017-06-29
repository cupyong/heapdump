var path = require('path');
var http = require('http');
var shelljs = require('shelljs');
var test = require('tap').test;
var heapdump = require('heapdump');

process.chdir(__dirname);

var server = http.createServer(function(req, res) {
    res.writeHeader(200);
    res.end();
});
server.on('listening', function(){
    console.log('Listening on http://127.0.0.1:8001/');
    console.log('PID %d', process.pid);

    var heapSnapshotFile = '/Users/zengzhiyong/work/myself/heapdump-' + Date.now() + '.heapsnapshot';
    shelljs.rm('-f', heapSnapshotFile);

    function waitForHeapdump(err, filename) {
        var files = shelljs.ls(heapSnapshotFile);
        server.close();
    }
    heapdump.writeSnapshot(heapSnapshotFile, waitForHeapdump);
});
server.listen(8001);