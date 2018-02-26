const fs = require("fs");
const path = require("path");

var dst_dir = "./";        		// 目标文件夹
var sou_dir = "./";             // 源文件夹



// 管理文件名称
var nameMap = {
	nametable_file: "",			// 文件名称对应表.json文件
	namelist: [],				// 数组
	init: function(){
		try{
		    this.namelist = JSON.parse(fs.readFileSync(this.nametable_file, "utf-8"));
		}catch(error){
		    this.namelist = [];
		}
	},
	look_tar(key){
		// 从namelist中找到source = key的对应的target的值
	    if(this.namelist.length > 0){
	    	var i, item;
	    	for( i = 0 ; i < this.namelist.length ; ++i){
	    		item = this.namelist[i];
	    		
	    	    if(key.indexOf(item["source"]) >= 0){ 
	    	    	return item["target"]; 
	    	    }
	    	}
	    }else{
	    	return "";
	    }
	},
	createNewFileName(old){
		// 形成新的文件名
		var oldFileName = path.basename(old);
        var newFileName = this.look_tar(oldFileName);
        
        var tarName = newFileName ? newFileName : oldFileName.slice(4);
        return path.join(dst_dir, tarName);
	}
};



/**
 * 源：要转换的文件列表
 * 1 如果提供文件列表
 * 		
 * 2 如果提供文件目录
 * 		2.1  目录中所有已zz_开头, 已.html结尾的文件
 */
var resouce = {
	files: [],
	init: function(){
		if(!this.files){
			// 如果没有提供文件列表
			var fileArr = fs.readdirSync(sou_dir);
			
			this.files = fileArr.filter(function(val, index){
				if(val.slice(0, 4) == "zz__" && val.match(/[.]html$/)){
					return true;
				}
			});
		}
	}
};


/**
 * 目标文件夹
 * 1 如果目录不存在则创建
 * 2 目标文件名称: 去掉zz_
 */
var tarDir = {
	dir: "",
	init: function(){
		try{
		    var fstats = fs.statSync(this.dir);
		}catch(error){
		    fs.mkdirSync(dst_dir);
		}
		
		this.dir = dst_dir;
	}
};


// 转换进程
var writeProcess = {
	start: function(){
		var i, fileName, newName;
		for( i = 0; i < resouce.files.length ; ++i){
	    	fileName = resouce.files[i];
	    	newName = nameMap.createNewFileName(item);
	    	
	    	var rs = fs.readFileSync(fileName, "utf-8");		// 读入源文件
	    	
		    var ws = fs.createWriteStream(newName);			// 写入流
		    ws.write(this.core(rs));
		}
	},
	createReg: function(){
		  // 匹配{%  %} 或 <a href=""></a>
	    return /\{\%(.*)\%\}|\<a.*href\=['"]([^"'?]*)[?]?.*["'].*\>/g;
	},
	createBodyReg: function(){
		// 只保留 <body></body> 之间的部分
		return /[<]body[>]([\s\S]*)[<][\/]body[>]/;
	},
	core: function(chunk){
		// 通过输入chunk, 输出des
	    var des = "";
	    
	    var match = null, 		// 查找到的匹配
	    	cur_index = 0,		// 查找到的匹配的索引
	        pre_index = 0;		// 下一个要查找的起点
	
	    // body 相关 
	    var match2 = null, 		// 查找到的匹配
	        file_name = "",
	        file_con = "",
	        file_type_arr = [],
	        
	        tar_url = "";
	
	    while(true){
	        match = reg.exec(chunk);
	        if(match){
	            cur_index = match.index;
	            // 把{%  %} 前面部分输出
	            des += chunk.slice(pre_index, cur_index);
	
	            /* 这里开始分情况了:
	             * 1、如果是href=""
	             * 2、如果是{%  %}
	             * */
	            if(match[0][0] == "{"){
	                file_name = match[1].trim();
	
	                /*  1、把{%  %} 包含的文件写入
	                 *  2、如果前面是url + 文件名称: 则只是把文件名称作为地址替换
	                 * */
	                file_type_arr = file_name.split(" ");
	                switch(file_type_arr[0]){
	                    case "url":
	                        // 地址替换
	                        des += file_type_arr[1];
	                        break;
	                    default:
	                        file_con = fs.readFileSync(file_type_arr[0], "utf-8");
	                        // 只讲<body></body>之间的内容写入文件
	                        match2 = file_con.match(reg2);
	                        if(match2){
	                            des += arguments.callee(match2[1]);
	                        }
	                }
	            }else if(match[0][0] == "<"){
	                file_name = match[2].trim();
	                // 从名称映射表中找到target键对应的地址，替换
	                tar_url = look_tar(file_name);
	                if(tar_url){ 
	                    // 如果存在，则写入
	                    des += match[0].replace(file_name, tar_url); 
	                }else{
	                    des += match[0];
	                }
	            }
	
	            // 从{%  %} 后面的位置继续搜索
	            pre_index = cur_index + match[0].length;
	        }else{
	            // 如果不存在，则将pre_index到结束位置的字符写入文件
	            des += chunk.slice(pre_index);
	            break;
	        }
	    }
	
	    return des;
	}
};


function main(){
	try {
		resouce.init();
		tarDir.init();
		nameMap.init();
		
		
		
		console.log("success!");
	}catch(e){
		console.log("error");
	}
}
