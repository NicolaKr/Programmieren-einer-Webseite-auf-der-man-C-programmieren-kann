const { spawn,execFile } = require('child_process')




exports.compile_from_form = function(req, res){

const cpp = spawn('g++', ['-x','c++','-o','/tmp/programm','-'])
cpp.stdin.write(req.body.code);
cpp.stdin.end();
cpp.stderr.on('data', (data) => {
	res.send(`ERRORRRR: ${data}`);
});
cpp.on('close', code => {
	if (code === 0){
		execFile('/tmp/programm', (error, data, stderr) => {
			if (error) {
				res.send(`EXECERROR: ${error}`);
			}else if (stderr) {
				res.send(`PROGRAMMERROR: ${stderr}`);
			} else {

			res.render('compile_show_result',{title: 'Ergebniss', code:data});
		}
		});
	}
	else{
		res.send(`ERROR: ${code}`);
	}
});
};

exports.index = function(req, res){
	res.render('compile_form', {title: 'compile_1'});
};
