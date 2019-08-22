# viper-cli

## commander
* `command` 方法是设置命令的名字
* `description` 方法是设置描述
* `alias` 方法是设置简写
* `action` 方法是设置回调

[Commander.js 中文文档(cli必备)](https://segmentfault.com/a/1190000019350684)
  
```js
program.command('init')
    .option('-i, --init [name]', 'init new project')
    .description('Generate a new project')
    .alias('i')
    .action(() => {
        require(res('init'));
    });
```

### commander Api

* version 
```textmate
var program = require('commander');
 
program
    .version('0.0.1')
    .parse(process.argv);
    
#执行结果：
node index.js -V
 
0.0.1
#如果希望程序响应-v选项而不是-V选项，
#只需使用与option方法相同的语法将自定义标志传递给version方法
program
  .version('0.0.1', '-v, --version')
```

* option
```textmate
使用.option()方法定义commander的选项options，
示例：.option('-n, --name <items1> [items2]', 'name description', 'default value')
参数解析：
自定义标志<必须>：分为长短标识，中间用逗号、竖线或者空格分割；标志后面可跟必须参数或可选参数，前者用 <> 包含，后者用 [] 包含
选项描述<省略不报错>：在使用 --help 命令时显示标志描述
默认值<可省略>
短标志可以作为单独的参数传递。像 -abc 等于 -a -b -c。多词组成的选项，像“--template-engine”会变成 program.templateEngine 等。
```

* command
```textmate
作用：添加命令名称，
示例：`.command('add <num> [otherDirs...]', 'install description', opts)`

参数解析：
命令名称<必须>：命令后面可跟用 <> 或 [] 包含的参数；命令的最后一个参数可以是可变的，像实例中那样在数组后面加入 ... 标志；在命令后面传入的参数会被传入到 action 的回调函数以及 program.args 数组中
命令描述<可省略>：如果存在，且没有显示调用action(fn)，就会启动子命令程序，否则会报错
配置选项<可省略>：可配置noHelp、isDefault等
```

* alias description usage

定义命令的别名 描述和用法
```textmate
.alias('r')
.usage('[options] <file ...>')
.description('run setup commands for all envs')

#output
gp-cli rm --help
Usage: rm|r [options] <file ...>

run setup commands for all envs

Options:

  -r, --recursive     Remove recursively
  -d --drink [drink]  Drink
  -h, --help          output usage information
```

* action

定义命令的回调函数 用法示例：.action(fn)
```textmate
program
    .command('rm <dest> [otherDirs...]')
    .alias('r')
    .option('-r, --recursive', 'Remove recursively')
    .option('-d --drink [drink]', 'Drink','Beer')
    .action(function (d, otherD,cmd) {
        console.log('remove ' + d ,(cmd.drink ),(cmd.recursive ))
        if (otherD) {
            otherD.forEach(function (oDir) {
                console.log('rmdir %s', oDir);
            });
        }

    })
#output
 ✗ gp-cli rm ./aa bb cc  -d -r
remove ./aa Beer true
rmdir bb
rmdir cc
```

* 自定义校验
```textmate
function range(val) {
  return val.split('..').map(Number);
}
 
function list(val) {
  return val.split(',');
}
 
function collect(val, memo) {
  memo.push(val);
  return memo;
}
 
function increaseVerbosity(v, total) {
  return total + 1;
}
 
program
  .version('0.1.0')
  .usage('[options] <file ...>')
  .option('-i, --integer <n>', 'An integer argument', parseInt)
  .option('-f, --float <n>', 'A float argument', parseFloat)
  .option('-r, --range <a>..<b>', 'A range', range)
  .option('-l, --list <items>', 'A list', list)
  .option('-o, --optional [value]', 'An optional value')
  .option('-c, --collect [value]', 'A repeatable value', collect, [])
  .option('-v, --verbose', 'A value that can be increased', increaseVerbosity, 0)
  .parse(process.argv);
 
console.log(' int: %j', program.integer);
console.log(' float: %j', program.float);
console.log(' optional: %j', program.optional);
program.range = program.range || [];
console.log(' range: %j..%j', program.range[0], program.range[1]);
console.log(' list: %j', program.list);
console.log(' collect: %j', program.collect);
console.log(' verbosity: %j', program.verbose);
console.log(' args: %j', program.args);


# 执行结果
node index.js -i 1.2 -f 1.2 -r 1..2 -l a,b -o hehe -c heihei -v zeze
 
 int: 1
 float: 1.2
 optional: "hehe"
 range: 1..2
 list: ["a","b"]
 collect: ["heihei"]
 verbosity: 1
 args: ["zeze"]
```


