var fs = require("fs");
var path = require("path");
var os = require("os");

// 源文件
var tar = "./public.css";       // source fiel
var args = process.argv.splice(2);
if(args){
    tar = args[0];
}else{
    return;
}

// 目标目录，目标文件名
var dest = "./";                // dest directory
var new_name = path.join(dest, path.basename(tar, ".css") + ".max" + ".css");

transform();


function transform(){
    // 反压缩css文件
    var con = fs.readFileSync(tar, "utf-8");

    con = transform_main(con);

    fs.writeFileSync(new_name, con, "utf-8");
}

function createReg(){
    // 本程序所用的正则表达式
    var reg_arr = ["{", "}", ";", ","],
        reg_str = "";

    for(var i = 0 ; i < reg_arr.length ; ++i){
        reg_str += "\\" + reg_arr[i];
        if(i < reg_arr.length -1) reg_str += "\|";
    }

    return new RegExp(reg_str, "g");
}



function transform_main(str, reg){
    // 转换主程序
    var old_con = str,
        new_con = "";

    var pre_index = 0,          // 上一个索引
        next_index = 0;         // 下一个查找的索引

    var reg = createReg(),
        result = "";            // 保存正则的结果
    
    var indent = "    ";        // 缩进
    var in_flag = false;        // 当前搜索位置是否位于{}之内
    do{
        result = reg.exec(old_con);

        // no exist
        if(!result)break;

        // exist
        next_index = result.index;
        // 1 把next_index ~ pre_index  之间的内容写入dest
        // 如果在{} 之外不加缩进，否则加缩进
        if(in_flag && result[0] != "}")new_con += indent;
        new_con += old_con.slice(pre_index, next_index);

        // 处理匹配的内容
        switch(result[0]){
            case "{":
                new_con += " {" + os.EOL;
                in_flag = true;
                break;
            case "}":
                new_con += "}" + os.EOL;
                in_flag = false;
                break;
            case ";":
                new_con += ";" + os.EOL;
                break;
            case ",":
                // {} 之外的
                // {} 之内的
                if(in_flag){
                    new_con += ", ";
                }else{
                    new_con += "," + os.EOL;
                }
                break;
            default:
                break;
        }

        // pre_index 指向 下一个
        pre_index = next_index + result[0].length;
    }while(true);

    return new_con;
}

