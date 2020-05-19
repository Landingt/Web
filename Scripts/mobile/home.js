﻿//首页事件
function onHomePage() {
    switchToolbar("homeTool");
    authorizationName();
    getJurisdictionData();
    getAppStatusBarHeight();
    //切换中英文右上角链接
    tranformMenu(window.localStorage.languageList);
}
//响应App绑定函数-获取状态栏高度
function getStatusBarHeight(height, ScreenHeight) {
    var heightRate = height / ScreenHeight;
    var parentHeight = document.body.clientHeight;
    heightRate = heightRate * parentHeight;
    if (heightRate > 0) {
        $(".md .statusbar").height(heightRate + "px");
    }
}

function getAppStatusBarHeight() {
    if (typeof(myJavaFun) != "undefined") {
        //App绑定函数-获取键盘高度
        if (typeof myJavaFun.getStatusBarHeight === "function") {
            myJavaFun.getStatusBarHeight();
        }
    }
}
//授权名称
function authorizationName() {
    var ajaxVar = $.ajax({
        type: "POST",
        url: "/GWService.asmx/GetName2SFService",
        timeout: 5000,
        data: {
            userName: window.localStorage.userName,
        },
        success: function(data) {
            var dt = $(data).find('string').text();
		
            if (dt) {
                if (dt == "false") {dt = "SmartCentre";}
				dt = "SmartCentre";
                $(".auth_name_get").text(dt);
                window.localStorage.auth_name_title = dt;
            } else {
                tipsInformtion(window.localStorage.languageList == 1 ? "Failed to obtain authorization name" : "获取授权名失败,是否退出登陆界面?", exitLogin);
            }
        },
        error: function(e) {
            tipsInformtion(window.localStorage.languageList == 1 ? "Failed to obtain authorization name" : "获取授权名失败,是否退出登陆界面?", exitLogin);
        }
    });
}
//提示窗口
function tipsInformtion(tipsStr, tipsEvent) {
    myApp.dialog.create({
        title: window.localStorage.languageList == 1 ? "Tips" : "提示",
        text: tipsStr,
        buttons: [{
            text: window.localStorage.languageList == 1 ? "Cancel" : "取消"
        }, {
            text: window.localStorage.languageList == 1 ? "confirm" : "确定",
            onClick: function() {
                tipsEvent();
            }
        }]
    }).open();
}
//轮播
function VideoBaner(className, slistName, jsonString) {
    $(".KOvm_container>div,.wiper-paginationTrailer-KOvm").html("");
    var countTrailer = jsonString.length;
    var xhTrailer = 0,
        signIndex = window.localStorage.languageList == 1 ? 6 : 8;
    for (var i = 0; i < countTrailer; i++) {
        var htmlTrailerChild = "<li class=\"" + (window.localStorage.languageList == 1 ? "col-33" : "col-25") + "\">" + "<a href=\"#\"  id=\"homeBtn" + (i + 1) + "\" class=\"homeBtn\" set_equip=\"" + jsonString[i].equipNo + "\" set_no=\"" + jsonString[i].setNo + "\" onclick=\"get_no_set(this," + jsonString[i].value + ")\">" + "<i class=\"" + jsonString[i].icon + "\" style=\"background:linear-gradient(45deg," + jsonString[i].color + ")\"></i>" + "<p class=\"p-ellipsis1\">" + (window.localStorage.languageList == 1 ? jsonString[i].name_en : jsonString[i].name) + "</p>" + "</a>" + "<a href=\"#\"  class=\"homeBtn displayNone\">" + "<i class=\"" + jsonString[i].icon + "\" ></i>" + "<p class=\"p-ellipsis1\">" + (window.localStorage.languageList == 1 ? jsonString[i].name_en : jsonString[i].name) + "</p>" + "</a>" + "<img src=\"#\" style=\"display:none;\"></li>";
        if (i % signIndex == 0 || i == 0) {
            xhTrailer++;
            var htmlTrailer = "<div class=\"swiper-slide\" dataID='" + xhTrailer + "'>" + "<ul class=\"row\" >" + htmlTrailerChild + "</ul></div>";
            $("." + className + " .swiper-wrapper").append(htmlTrailer);
        } else {
            $("." + className + " .swiper-wrapper .swiper-slide[dataID=" + xhTrailer + "] ul").append(htmlTrailerChild);
        }
        if (i == countTrailer - 1 && $("." + className + " .swiper-wrapper .swiper-slide[dataID=" + xhTrailer + "] ul").find("li").length < 8) {
            $("." + className + " .swiper-wrapper .swiper-slide[dataID=" + xhTrailer + "] ul").addClass("homeControlFunction");
        }
    }
    $(".swiper-paginationTrailer").html("");
    var paginationDom = "";
    for (var j = 0; j < xhTrailer; j++) {
        if (j == 0) {
            paginationDom = `<span class="swiper-pagination-bullet swiper-pagination-bullet-active"></span>`;
        } else paginationDom += '<span class="swiper-pagination-bullet"></span>';
    }
    $(".swiper-paginationTrailer").append(paginationDom);
    var swiper = myApp.swiper.create('.swiper-containerTrailer', {
        speed: 400,
        spaceBetween: 100,
        pagination: '.swiper-pagination',
    });
    var activeIndex = 0;
    $(".swiper-containerTrailer")[0].addEventListener('touchend', function() {
        activeIndex = parseInt($(".swiper-slide-active").attr("dataid")) - 1;
        $(".swiper-paginationTrailer span:eq(" + activeIndex + ")").addClass("swiper-pagination-bullet-active").siblings().removeClass("swiper-pagination-bullet-active");
    }, false);
}
//常用
function commonlyUsedFun(className, classListName, jsonString) {
    $("." + className).html("");
    var countTrailer = jsonString.length;
    var htmlTrailerChild = "",
        xhTrailer = 0;
    for (var i = 0; i < countTrailer; i++) {
        htmlTrailerChild += "<li class=\"col-" + classListName + "\">" + "<a href=\"" + (window.localStorage.languageList == 1 ? jsonString[i].href_en : jsonString[i].href_zh) + "\"  id=\"homeBtn" + (i + 1) + "\" class=\"homeBtn\" set_equip=\"" + jsonString[i].equipNo + "\" set_no=\"" + jsonString[i].setNo + "\" onclick=\"get_no_set(this,'" + jsonString[i].value + "')\">" + "<i class=\"" + jsonString[i].icon + "\" style=\"background: linear-gradient(30deg," + jsonString[i].color + ")\"></i>" + "<p class=\"p-ellipsis1\">" + (window.localStorage.languageList == 1 ? jsonString[i].name_en : jsonString[i].name) + "</p>" + "</a>" + "<a href=\"#\"  class=\"homeBtn displayNone\">" + "<i class=\"" + jsonString[i].icon + "\"></i>" + "<p class=\"p-ellipsis1\">" + (window.localStorage.languageList == 1 ? jsonString[i].name_en : jsonString[i].name) + "</p>" + "</a>" + "</li>";
    }
    $("." + className).append(htmlTrailerChild);
}
//实时快照 
var event_Level_list_home, btnInfoNames_home = [],
    btnInfoLevels_home = [];

function snashotData() {
    btnInfoNames_home.length = 0, btnInfoLevels_home.length = 0;
    $.ajax({
        type: 'post',
        url: '/api/event/alarm_config',
        headers: {
            Authorization: window.localStorage.ac_appkey + '-' + window.localStorage.ac_infokey //签名由getkey接口获取
        },
        data: {},
        success: function(dt) {
            if (dt.HttpStatus == 200 && dt.HttpData.data) {
                var resultData = dt.HttpData.data;
                var strData = "";
                for (var i = 0; i < resultData.length; i++) {
                    if (resultData[i].IsShow == 1) {
                        var btnStatus = resultData[i].IsShow == 1 ? true : false;
                        var btnValue = [];
                        for (var j = resultData[i].SnapshotLevelMin; j <= resultData[i].SnapshotLevelMax; j++) {
                            btnValue += j + ",";
                        }
                        event_Level_list_home += btnValue;
                        btnValue = btnValue.substring(0, btnValue.length - 1);
                        btnInfoNames_home.push(resultData[i].SnapshotName)
                        btnInfoLevels_home.push(btnValue);
                    }
                }
                snashotCount(btnInfoLevels_home);
            }
        }
    });
}

function snashotCount(btnInfoLevels_home) {
    var strBtnInfoLevels = "";
    for (var i = 0; i < btnInfoLevels_home.length; i++) {
        strBtnInfoLevels += btnInfoLevels_home[i] + "/";
    }
    if (strBtnInfoLevels.length > 0) {
        strBtnInfoLevels = strBtnInfoLevels.substring(0, strBtnInfoLevels.length - 1);
        $.ajax({
            type: 'post',
            url: '/api/event/real_evt_count',
            headers: {
                Authorization: window.localStorage.ac_appkey + '-' + window.localStorage.ac_infokey //签名由getkey接口获取
            },
            data: {
                levels: strBtnInfoLevels
            },
            success: function(dt) {
                if (dt.HttpStatus == 200 && dt.HttpData.data) {
                    var resultData = dt.HttpData.data;
                    var resultDataArr = resultData.toString().split(",");
                    for (var i = 0; i < resultDataArr.length; i++) {
                        $(".statisticsTable a:eq(" + i + ")").attr("href", "/snapShotDetail/?" + btnInfoNames_home[i] + '&' + btnInfoLevels_home[i]).find("p").text(resultDataArr[i]);
                    }
                }
            }
        });
    }
}
//配置界面
function getJurisdictionData() {
    myApp.dialog.progress((window.localStorage.languageList == 1 ? '<a style="font-size: 1rem">Loading...</a>' : '<a style="font-size: 1rem">加载中...</a>'));
    // 权限管理 
    var JurisdictionArray = [];
    $.when(AlarmCenterContext.post("/api/GWServiceWebAPI/getJurisdictionData", {
        async: false
    })).done(function(n) {
        let result = n.HttpData;
        var JurisdictionFunArray = result.data.filter((item, index) => {
            if (item.ClassName.indexOf("AlarmCenter.APP.Home") > -1) return item;
        });
        if (result.code == 200) {
            $.ajax({
                type: "post",
                url: service + "/UserPermissions",
                data: "userName=" + window.localStorage.userName,
                success: function(usersDt) {
                    myApp.dialog.close();
                    $("#homeContents>ul").html("");
                    getWebUser = $(usersDt).children("UserItem");
                    let resultControl = $(usersDt).find("RoleItem").find("AddinModule_List").find("int"),
                        JurisdictionArrayList = [];
                    if ($(usersDt).find("IsAdministrator").text() == "true") JurisdictionArray = ["HomeSnapShot", "HomeButton", "HomeCommonlyused", "HomeShortcutFunction", "HomeSystemMenu", "homeNewlyBuild"];
                    else {
                        resultControl.each(function(index_p, item_p) {
                            JurisdictionArrayList.push($(item_p).text());
                        });
                        let Juris = JurisdictionFunArray.filter((item, index) => JurisdictionArrayList.some(item_ch => item_ch.toString() == item.ID.toString()));
                        Juris.forEach((item, index) => {
                            JurisdictionArray.push(item.ClassName.replace("AlarmCenter.APP.Home.", ""));
                        });
                    }
                    var html = "";
                    JurisdictionArray.forEach(function(item, index) {
                        html += functionalModule(item, "");
                    });
                    $("#homeContents>ul").append(html);
                    // 实现内容添加 
                    JurisdictionArray.forEach(function(item, index) {
                        switch (item) {
                            case "HomeSnapShot":
                                snashotData();
                                break;
                            case "HomeShortcutFunction":
                                $(".videoPatternHeader").parent().find("p label").html(window.localStorage.languageList == 1 ? jjPattern[7].title_en : jjPattern[7].title);
                                $(".pptPatternHeader").parent().find("p label").html(window.localStorage.languageList == 1 ? pptPattern[5].title_en : pptPattern[5].title);
                                myApp.swiper.create('.HomeShortcutFunction-swiper', {
                                    spaceBetween: 10,
                                    slidesPerView: 1.2
                                });
                                break;
                            case "HomeButton":
                                VideoBaner("KOvm_container", "swiper-paginationTrailer-KOvm", KOvm);
                                break;
                            case "HomeCommonlyused":
                                commonlyUsedFun("commonlyUsed", "25", commonlyUsed);
                                break;
                            case "HomeSystemMenu":
                                commonlyUsedFun("sysFourMenu", "25", sysFourMenu);
                                break;
                            case "homeNewlyBuild1":
                                //加载newlyBuild脚本
                                initPageJS('newlyBuild', '/Scripts/mobile/');
                                break;
                            default:
                                break;
                        }
                    });
                }
            });
        }
    }).fail(function(e) {
        // myApp.router.navigate("/home/");  
    });
}

function functionalModule(className, htmlStr) {
    var html = "";
    switch (className) {
        case "HomeSnapShot":
            html = `<li class="row HomeSnapShot statisticsTable no-gap">
                        <a class="col-20"><p>0</p>${window.localStorage.languageList == 1?"Errors":"故障"}</a>
                        <a class="col-20"><p>0</p>${window.localStorage.languageList == 1?"Warnings":"警告"}</a>
                        <a class="col-20"><p>0</p>${window.localStorage.languageList == 1?"Informations":"信息"}</a>
                        <a class="col-20"><p>0</p>${window.localStorage.languageList == 1?"Settings":"设置"}</a>
                        <a class="col-20" style="border-right: 0;"><p>0</p>${window.localStorage.languageList == 1?"Assets":"资产"}</a>
                    </li>`;
            break;
        case "HomeShortcutFunction":
            html = `<li class="row HomeShortcutFunction">
                 <div data-pagination='{"el": ".swiper-pagination"}' data-space-between="20" data-slides-per-view="1.5" class="swiper-container swiper-init HomeShortcutFunction-swiper">
                  <div class="swiper-wrapper">

                    <div class="swiper-slide" onclick="videoExplain()">
                       <div class="videoPatternHeader row">
                          <span class="col-100">
                             <h3>${window.localStorage.languageList == 1?"Video Explanation":"视频讲解"}</h3>
                             ${window.localStorage.languageList == 1?"Remote control":"遥控器"}
                          </span>
                          <a><i class="iconfont icon-f7_icon_hf"></i></a>
                       </div>
                       <p>${window.localStorage.languageList == 1?"Current file":"当前文件"}: <label>敢为平台演示.mp4</label></p>
                    </div>

                    <div class="swiper-slide" onclick="pptPlay()">
                       <div class="pptPatternHeader row">
                          <span class="col-100">
                             <h3>${window.localStorage.languageList == 1?"PPT Paly":"PPT播放"}</h3>
                             ${window.localStorage.languageList == 1?"Remote control":"遥控器"}
                          </span>
                           <a><i class="iconfont icon-f7_ppt"></i></a>
                       </div>
                       <p>${window.localStorage.languageList == 1?"Current file":"当前文件"}: <label>敢为平台演示.pptx</label></p>
                    </div>

                  </div>
                </div>                                  
            </li>`;
            break;
        case "HomeButton":
            html = `<li class="row HomeButton">
              <div class="swiper-containerTrailer KOvm_container swiper-init swiper-container" data-space-between="50" >
                <div class="swiper-paginationTrailer swiper-paginationTrailer-KOvm swiper-pagination"></div>
                <div class="swiper-wrapper" style="margin-bottom: 5%;"></div>
              </div>
            </li>`;
            break;
        case "HomeCommonlyused":
            html = `<li class="HomeCommonlyused">
                    <ol class="row commonlyUsed">                                   
                    </ol>
            </li>`;
            break;
        case "HomeSystemMenu":
            html = `<li class="HomeCommonlyused">
                    <ol class="row sysFourMenu">                                   
                    </ol>
            </li>`;
            break;
        case "homeNewlyBuild1":
            html = `<li class="homeNewlyBuild"></li>`;
            break;
        default:
            html = htmlStr;
            break;
    }
    return html;
}
//视频讲解
function videoExplain() {
    var htmlContent = `<div class="popoverVideoExplain">
     <div class="row">
         <a href="#" class="popoverVideoExplain col-33"  set_equip="${jjPattern[0].equipNo}" set_no="${jjPattern[0].setNo}" onclick="get_no_set(this,null)" >
               <i class="${jjPattern[0].icon}"></i>
            <p>${window.localStorage.languageList == 1 ?jjPattern[0].name_en:jjPattern[0].name}</p>
         </a>
         <a href="#" class="popoverVideoExplain col-33"  set_equip="${jjPattern[2].equipNo}" set_no="${jjPattern[2].setNo}" onclick="get_no_set(this,null)" >
               <i class="${jjPattern[2].icon}"></i>
               <p>${window.localStorage.languageList == 1 ?jjPattern[2].name_en:jjPattern[2].name}</p>
         </a>
         <a href="#" class="popoverVideoExplain col-33"  set_equip="${jjPattern[3].equipNo}" set_no="${jjPattern[3].setNo}" onclick="get_no_set(this,null)" >
               <i class="${jjPattern[3].icon}"></i>
            <p>${window.localStorage.languageList == 1 ?jjPattern[3].name_en:jjPattern[3].name}</p>
         </a>                                 
     </div>
     <div class="row">
         <a href="#" class="popoverVideoExplain col-33"  set_equip="${jjPattern[4].equipNo}" set_no="${jjPattern[4].setNo}" onclick="get_no_set(this,null)" >
            ${window.localStorage.languageList == 1 ?jjPattern[4].name_en:jjPattern[4].name}
         </a>
         <a href="#" class="popoverVideoExplain col-33"  set_equip="${jjPattern[5].equipNo}" set_no="${jjPattern[5].setNo}" onclick="get_no_set(this,null)" >
            ${window.localStorage.languageList == 1 ?jjPattern[5].name_en:jjPattern[5].name}
         </a>
         <a href="#" class="popoverVideoExplain col-33"  set_equip="${jjPattern[6].equipNo}" set_no="${jjPattern[6].setNo}" onclick="JumpPage(this)" >
            ${window.localStorage.languageList == 1 ?jjPattern[6].name_en:jjPattern[6].name}
         </a>  
     </div>
     <a href="#" class="popoverVideoExplain"  set_equip="${jjPattern[1].equipNo}" set_no="${jjPattern[1].setNo}" onclick="get_no_set(this,null)" >
            ${window.localStorage.languageList == 1 ?jjPattern[1].name_en:jjPattern[1].name}
      </a>  </div>
    `;
    ststemSet(window.localStorage.languageList == 1 ? "Video Explanation" : "视频讲解", "sceneBtnControl", htmlContent);
}
//ppt播放 
function pptPlay() {
    var htmlContent = `<div class="popoverVideoExplain">
     <div class="row">
         <a href="#" class="popoverVideoExplain col-33"  set_equip="${pptPattern[0].equipNo}" set_no="${pptPattern[0].setNo}" onclick="get_no_set(this,null)" >
               <i class="${pptPattern[0].icon}"></i>
            <p>${window.localStorage.languageList == 1 ?pptPattern[0].name_en:pptPattern[0].name}</p>
         </a>                                
     </div>
     <div class="row">
         <a href="#" class="popoverVideoExplain col-33"  set_equip="${pptPattern[2].equipNo}" set_no="${pptPattern[2].setNo}" onclick="get_no_set(this,null)" >
            ${window.localStorage.languageList == 1 ?pptPattern[2].name_en:pptPattern[2].name}
         </a>
         <a href="#" class="popoverVideoExplain col-33"  set_equip="${pptPattern[3].equipNo}" set_no="${pptPattern[3].setNo}" onclick="get_no_set(this,null)" >
            ${window.localStorage.languageList == 1 ?pptPattern[3].name_en:pptPattern[3].name}
         </a>
         <a href="#" class="popoverVideoExplain col-33"  set_equip="${pptPattern[4].equipNo}" set_no="${pptPattern[4].setNo}" onclick="JumpPage(this)" >
            ${window.localStorage.languageList == 1 ?pptPattern[4].name_en:pptPattern[4].name}
         </a>  
     </div>
     <a href="#" class="popoverVideoExplain"  set_equip="${pptPattern[1].equipNo}" set_no="${pptPattern[1].setNo}" onclick="get_no_set(this,null)" >
            ${window.localStorage.languageList == 1 ?pptPattern[1].name_en:pptPattern[1].name}
      </a>  </div>
    `;
    ststemSet(window.localStorage.languageList == 1 ? "PPT Paly" : "PPT播放", "sceneBtnControl", htmlContent);
}
//设置跳页
function JumpPage(dt) {
    myApp.dialog.prompt(window.localStorage.languageList == 1 ? "Please enter a jump page" : "请输入跳转页", window.localStorage.languageList == 1 ? "Tips" : "提示", function(name) {
        if (parseFloat(name).toString() == "NaN") myApp.dialog.alert(window.localStorage.languageList == 1 ? "Please enter a number" : "请输入数字");
        else get_no_set(dt, name);
    });
}