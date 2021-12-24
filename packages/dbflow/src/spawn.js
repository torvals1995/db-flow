import { format } from 'util';
import child_process from 'child_process';

export default function spawn(config) {
  const cmd = format('echo \'%j\' | "%s"', config, require.resolve('../deploy'));
  // const cmd = format('echo \'%j\'', config);
  // console.log('cmd: ', cmd);
  const proc = child_process.spawn('sh', ['-c', cmd], { stdio: 'inherit' });
  // proc.on('error', function (err) {
  //   error = err;
  // });

  // proc.on('close', function (code) {
  //   if (code === 0) return cb(null, args);
  //   error = error || new Error(format('Deploy failed with exit code: %s', code));
  //   error.code = code;
  //   return cb(error);
  // });
}
// spawn(config, args, cb) {
//   var cmd = format('echo \'%j\' | "%s"', config, require.resolve('../deploy'));
//   args = args || [];
//   if (args.length > 0) {
//     var cmdArgs = args.map(function (arg) {
//       return format('"%s"', arg);
//     }).join(' ');
//     cmd = [cmd, cmdArgs].join(' ');
//   }
//   console.log('cmd: ', cmd);
//   var proc = child_process.spawn('sh', ['-c', cmd], { stdio: 'inherit' });
//   // var error;

//   // proc.on('error', function (err) {
//   //   error = err;
//   // });

//   // proc.on('close', function (code) {
//   //   if (code === 0) return cb(null, args);
//   //   error = error || new Error(format('Deploy failed with exit code: %s', code));
//   //   error.code = code;
//   //   return cb(error);
//   // });
// }