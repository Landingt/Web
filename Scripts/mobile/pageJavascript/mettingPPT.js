﻿var PowerPointHtml =[{html:"",arry:[]},{html:"",arry:[]}];
function mettingPPT() {
    if ($("#Filelist>ul>li").html() == " " || $("#Filelist>ul>li").html() == undefined) {
        fileStuctureChild("", "");
        fileStuctureChild("u", "");
    }

    //文件选择 
    $(".pptFileSelectContent>div").unbind();
    $(".pptFileSelectContent>div").bind('click', function() {
        let htmlContent = "";
        if ($(this).attr("dataset") == "1") {
            ststemSetPPT(window.localStorage.languageList == 1?"PowerPoint":"PowerPoint","sceneBtnControl",PowerPointHtml[0].html,"");  
           
        } else {
            ststemSetPPT(window.localStorage.languageList == 1?"Mobile Storage":"移动设备","sceneBtnControl",PowerPointHtml[1].html,"u");  

        }
    });
    isFilePPT();
    // 刷新
    // $(".modalDiv").addClass("displayNone");
    // $(".icon-refresh").unbind();
    // $(".icon-refresh").bind('click', function() {
    //     writeResh();
    //     if ($(".selectUD").attr("dataset") == 1) {
    //         fileStuctureChild("", ""); //刷新C盘列表
    //     } else {
    //         fileStuctureChild("u", ""); //刷新U盘列表
    //     }
    // });


}
//刷新隐藏
$(".modalDiv").addClass("displayNone");
//点击的是文件,则保存点击记录 
$.extend({
    // 点击进入
    setFounction: function(that) {
        window.localStorage.storageI = $(that).text();
        window.localStorage.dataURL = $(that).attr("data-url");
    }
})
// 文件结构处理
var stringFile, UsbDriveTips = myApp.toast.create({text: "没有检测到对应设备.", position: 'center', closeTimeout: 2000, });

function fileStuctureChild(url, objectList) {
    // $(objectList).next().html("");
    // $(objectList).next().html("");
    $.when(AlarmCenterContext.post("/api/Other/GetFileStructure",{filePath: url,fileName: "",})).done(function(n){
        $(".modalDiv").addClass("displayNone");
        var result = n.HttpData, contentHtml = "";
        if (result != "false" && result != "null") {
            stringFile = JSON.parse(result);
            //继续查询每项列表下的子目录
            for (var i = 0; i < stringFile.length; i++) {
                if($.trim(stringFile[i]).split("\\")[2] != "") //排除 D:\PPT\ 格式文件夹
                {
                    if (isStucture(stringFile[i]) && stringFile[i] != "") //如果为文件夹  
                    {
                        contentHtml += '<li class="bottomBorderLine"><a href="#" class="item-content item-link fileListActive"  data-url="' + stringFile[i] + '" onclick="opeChildFile(this)"><i class="iconfont icon-file"></i>' + getSubstrNmae(stringFile[i]) + '<b class="iconfont icon-rightDire"></b></a><ul></ul></li>';
                    } else if (stringFile[i] != "") {
                        contentHtml += '<li class="bottomBorderLine"><a href="#" class="item-content item-link fileListActive"  data-url="' + stringFile[i] + '" set_no=' + PPTcommand.openPPT.setNo + ' set_equip=' + PPTcommand.openPPT.equipNo + ' set_id=' + PPTcommand.openPPT.setNo + ' onclick=\"setMenu(this,null,null)\"><i class="iconfont icon-pptIcon"></i>' + getSubstrNmae(stringFile[i]) + '</a></li>';
                    }
                    // if (objectList == "") 
                    //    $("#Filelist>ul").append(contentHtml);
                    // else {
                    //     $(objectList).next().append(contentHtml);
                    // }
                }
            }
            if(url == "u")
              { PowerPointHtml[1].html =  "<h3 class='powerPointHtmlH3'>文件列表</h3><ul class='list list-block powerPointHtmlUl'>"+contentHtml+"</ul>";PowerPointHtml[1].arry = stringFile;$(".pptFileSelectContent>div:eq(1) label").text(stringFile.length+"项");}
            else
              {PowerPointHtml[0].html =  "<h3 class='powerPointHtmlH3'>文件列表</h3><ul class='list list-block powerPointHtmlUl'>"+contentHtml+"</ul>";PowerPointHtml[0].arry = stringFile;$(".pptFileSelectContent>div:eq(0) label").text(stringFile.length+"项");}

        }
    }).fail(function(e){

          if(url == "u")
              {PowerPointHtml[1].html =  "";PowerPointHtml[1].arry = []; $(".pptFileSelectContent>div:eq(1) label").text("0项"); }
            else
              {PowerPointHtml[0].html =  "";PowerPointHtml[0].arry = [];$(".pptFileSelectContent>div:eq(0) label").text("0项");}
    });
}
//文件夹 true
function isStucture(stringFile) {
    if (stringFile.length > 4) {
        if (stringFile.substr(-4) == ".pdf" || stringFile.substr(-4) == ".ppt" || stringFile.substr(-5) == ".pptx" || stringFile.substr(-4) == ".xls" || stringFile.substr(-4) == ".xslx") {
            return false;
        } else {
            return true;
        }
    } else {
        return true;
    }
}
//提取名称
function getSubstrNmae(name) {
    return name.split("\\")[name.split("\\").length - 1];
}
// 菜单
function opeChildFile(that) {
    $(that).next().html("");
    // 右边图标
    if ($(that).hasClass("isSingle")) {
        $(that).removeClass("isSingle");
        $(that).find("b").removeClass("icon-bottomDire").addClass("icon-rightDire");
    } else {
        $(that).addClass("isSingle");
        $(that).find("b").removeClass("icon-rightDire").addClass("icon-bottomDire");
        var urlAc = $(that).attr("data-url");
        if (isStucture(urlAc)) {
            fileStuctureChild(urlAc, that);
            $(".modalDiv").removeClass("displayNone");
        }
    }
}
// 清除重写
function writeResh() {
    $("#Filelist>ul").html("");
}
//历史记录  
function isFilePPT() {
    if (window.localStorage.storageI != undefined && window.localStorage.storageI != "") {
        $(".pptActive").find("a").remove();
        $(".pptActive").append('<a href="#" class="item-content item-link historyPPT" data-url="' + window.localStorage.dataURL + '"  set_no=' + PPTcommand.openPPT.setNo + ' set_equip=' + PPTcommand.openPPT.equipNo + ' set_id=' + PPTcommand.openPPT.setNo + ' onclick=\"setMenu(this,null,null)\"></i><i class="iconfont icon-pptIcon"></i>' + window.localStorage.storageI + '</a>');
        $(".pptActive a").attr("data-url", window.localStorage.dataURL);
    }
}

function setMenu(that, value, slideIndex) {

    openFileCommand(that, $(that).attr("set_equip"), 1, "-", (value ? value : $(that).attr("data-url")), "test", slideIndex);
}
//设置命令-确定
function openFileCommand(dt, equip_no, main_instruction, minor_instruction, value, set_nm, slideIndex) { //equip_no,main_instruction,minor_instruction,value,set_nm
    var userName = window.localStorage.userName;
    $.when(AlarmCenterContext.post("/api/Real/setup", {
        equip_no: equip_no,
        main_instr: main_instruction,
        mino_instr: minor_instruction,
        value: value
    })).done(function(n) {
        if (n.HttpData.code == 200 || n.HttpData.code == 201) {
            myApp.dialog.progress('<a style="font-size: 1rem">加载中...</a>');
            //辨别点击历史记录或者普通记录 
            $(dt).hasClass("historyPPT") ? window.localStorage.historyis = 1 : window.localStorage.historyis = 0;
            //点击的是文件,则保存点击记录 
            if (!isStucture($(dt).text()) && $(dt).text() != "") {
                $.setFounction(dt);
            }
            try {
                window.localStorage.pptUsername = $(dt).attr("data-url").split("\\")[$(dt).attr("data-url").split("\\").length - 1].split(".")[0]; //ppt名称          
            } catch (e) {};
            if ($(".page-current>div").hasClass("mettingPPTContent")) //ppt列表
            {
                var setTimeout = setInterval(function() {
                    $.when(AlarmCenterContext.pptConfig($(dt).attr("set_equip"))).done(function(n) {
                        var result = n.HttpData;
                        if (result.PageCount != -1) {
                            window.localStorage.sessionFilename = result.Session; //data[1];
                            window.localStorage.sessionValue = result.PageCount; //data[1];
                            myApp.dialog.close();
                            clearInterval(setTimeout);
                            myApp.popover.close(".popup-public");
                            myApp.router.navigate('/mettingDetails/');
                        }
                    }).fail(function(e) {});
                }, 500);
            }
            // if ($(".page-current>div").hasClass("mettingDetailsContent")) { //ppt详情  
            //     $(".mettingDetails_index").find("div:eq(" + (slideIndex - 1) + ")").addClass("selectBorder").siblings().removeClass("selectBorder");
            //     var src = $(".mettingDetails_index>div:eq(" + (slideIndex - 1) + ")").find("img").attr("src");
            //     $(".setviewPng").attr('src', src);
            // }
        } else {
            myApp.dialog.close();
        }
    }).fail(function(e) {
        myApp.dialog.close();
    });
}
//ppt 弹窗
var popoverPPT;
function ststemSetPPT(title,id,html,value){
    myApp.request.get("plug/popoverTemplate.html", "", function (data) {
        var popoverHTML=data;
        popoverPPT  = myApp.popover.create({
            targetEl: "#"+id,
            content: popoverHTML,
        }).open();
        $(".publicHeader-back").unbind().bind("click",function(){ try{toastBottom.close();} catch(e){}});
        $(".publicHeader span").html(title);
        $(".popup-public section").html(html);

    });
}