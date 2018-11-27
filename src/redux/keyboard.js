
const spawn= require("child_process").spawn;

// var py = spawn('python3.7', ['-u', '../python/keyboard.py']);
var py = spawn('source ../python/venv/bin/activate && python -u ../python/keyboard.py', {
  shell: true
});
py.stdout.on('data', function(key){
    console.log("hello" + key);
  });



// var py = spawn('python3.7', ['-u', './keyboard.py']);
// py.stdout.on('data', function(data){
//     console.log("Data: " + data);
//   });