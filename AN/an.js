﻿var in_word_div = 0;	// 判斷滑鼠是不是在文字的範圍中
var in_note_div = 0;	// 判斷滑鼠是不是在註解視窗的範圍中, 當不在這二個範圍中時, 註解視窗就消失

function get_str_title()
{
		var myurl=window.location.toString();
	var sutranum = myurl.replace(/^.*(\d\d\d\d)\.htm/i,"$1"); 
// 取出經號
	var next_sutra = parseInt(sutranum,10) + 1; 
// 下一經
if(next_sutra > 1764) {next_sutra = 1;}
	next_sutra = "0000" + next_sutra.toString();
	next_sutra = next_sutra.replace(/^.*(\d\d\d\d)/,"$1");
	var pre_sutra = parseInt(sutranum,10) - 1; 
// 前一經
	if(pre_sutra < 1){pre_sutra = 1764;}
	pre_sutra = "0000" + pre_sutra.toString();
	pre_sutra = pre_sutra.replace(/^.*(\d\d\d\d)/,"$1");
	var str_title = '<font color="#3366FF"><span style="font-size:14pt; font-family:新細明體">　<a href="../index.htm">首 頁</a>　<a href="index.htm">目錄/凡例</a>　<a href="AN' + pre_sutra + '.htm">上一經</a>/<a href="AN' + next_sutra + '.htm">下一經</a>　凡以<font color="#CC3300">檔案<font color="#3366FF">或<font color="#CC3300">紙本印刷<font color="#3366FF">流通者須以<font color="#CC3300">贈送<font color="#3366FF">、<font color="#CC3300">不刪除巴利語經文<font color="#3366FF">為之</font><div id="main_menu"></div>';
	return str_title;
}
function write_str_title()
{
	var str_title = get_str_title();
	document.write(str_title);
}
function draw_layout () 
{
	var str_title = get_str_title();
    Ext.onReady(function()
{
       Ext.state.Manager.setProvider(new Ext.state.CookieProvider());
       var viewport = new Ext.Viewport
(
{
            layout:'border',
               items:
[{
            region:'north',
               contentEl: 'north',
               autoScroll: true,
               collapsible: true,
                title: str_title,
                    split: true,
                    height: 60,
                    border: false,
                    minSize: 1,
                    maxSize: 500,
                    margins:'0 0 0 0'
 },
/* {
                   region:'south',
                    contentEl: 'south',
                    title:'<font color="#3366FF"><span style="font-size:16pt">經文比對</font>',
                    split: true,
                    autoScroll: true,
                    collapsible: true,
                    height: 180,
                    border: false,
                    minSize: 1,
                    maxSize: 1000,
                    margins:'0 0 0 0'
 }, */
 /*{
               region:'west',
                    contentEl: 'west',
                    title:'功能表',
                    split:true,
                    width: 50,
                    minSize: 50,
                    maxSize: 300,
                    collapsible: true,
                    margins:'0 0 0 0',
                    layout:'accordion',
                    layoutConfig:
{
                   animate:true
  }
 },
 
*/
{
                   region:'east',
                    contentEl: 'east',
                    title: '<font color="#3366FF"><span style="font-size:14pt">巴利語經文<font color="#CC3300">(點右端»隱藏本欄)</font></font>',
                    split: true,
                    collapsible: true,
                    autoScroll: true,
                    width: '50%',
                    border: false,
                    minSize: 1,
                    maxSize: 900,
                    layout:'fit',
                    margins:'0 0 0 0'
 },
{
                   region: 'center',
                    contentEl: 'center',
                    title: '<font color="#3366FF"><span style="font-size:14pt">漢譯增支部經文</font>',
                    autoScroll: true,
                    collapsible: true,
                    width: '50%',
                    border: false,
                    layout:'fit',
                    margins:'0 0 0 0'
                }
             ]
        });
    });
}
function do_some_thing () 
{
	$(document).ready(function()
{
	$('head').append('<meta http-equiv="expires" content="-1">');
//    	$("#east").html($("#center").html());
    	$("#notediv").mouseover(function(){ in_note_div = 1; });	// 記錄滑鼠移入註解視窗
    	$("#notediv").mouseout(function(){ in_note_div = 0; });		// 記錄滑鼠移開註解視窗
    	$("#east").mouseover(function(){ check_note_div(); });		// 處理滑鼠移到主視窗的文字時, 要檢查此時是不是要取消註解視窗
    	$("#center").mouseover(function(){ check_note_div(); });	// 處理滑鼠移到主視窗的文字時, 要檢查此時是不是要取消註解視窗
    	
    	// 將所有類似《雜阿含30經》的文字變成《<a href="../SA/SA0030.htm" target="_blank">雜阿含30經</a>》
    	// 將所有類似《中阿含4經》的文字變成《<a href="../MA/MA004.htm" target="_blank">中阿含30經</a>》
    	// 將所有類似《長阿含4經》的文字變成《<a href="../DA/DA04.htm" target="_blank">長阿含4經</a>》
    	// 將所有類似《增壹阿含4經》的文字變成《<a href="../AA/AA004.htm" target="_blank">增壹阿含4經</a>》
    	add_agama_link("#south");
	});}
//
// 將所有類似《雜阿含30經》的文字變成《<a href="SA0030.htm" target="_blank">雜阿含30經</a>》
// 將所有類似《中阿含4經》的文字變成《<a href="../MA/MA004.htm" target="_blank">中阿含4經</a>》
// 將所有類似《長阿含4經》的文字變成《<a href="../DA/DA04.htm" target="_blank">長阿含4經</a>》
// 將所有類似《增壹阿含4經》的文字變成《<a href="../AA/AA004.htm" target="_blank">增壹阿含4經</a>》
//
function add_agama_link(obj_div)
{
	var mycomp = $(obj_div).html();
	mycomp=mycomp.replace(/《雜阿含(\d+)經》/g, function(word,str1)
	{
		var mynum = "0000" + str1.toString();
		mynum = mynum.replace(/^.*(\d\d\d\d)/,"$1");
		mynum = '《<a href="../SA/SA' + mynum + '.htm" target="_blank">雜阿含' + str1.toString() + '經</a>》';
  		return mynum;
  	}
	);
	mycomp=mycomp.replace(/《中阿含(\d+)經》/g, function(word,str1)
	{
		var mynum = "000" + str1.toString();
		mynum = mynum.replace(/^.*(\d\d\d)/,"$1");
		mynum = '《<a href="../MA/MA' + mynum + '.htm" target="_blank">中阿含' + str1.toString() + '經</a>》';
  		return mynum;
  	}
	);
	mycomp=mycomp.replace(/《長阿含(\d+)經》/g, function(word,str1)
	{
		var mynum = "00" + str1.toString();
		mynum = mynum.replace(/^.*(\d\d)/,"$1");
		mynum = '《<a href="../DA/DA' + mynum + '.htm" target="_blank">長阿含' + str1.toString() + '經</a>》';
  		return mynum;
  	}
	);
	mycomp=mycomp.replace(/《增壹阿含(\d+)經》/g, function(word,str1)
	{
		var mynum = "000" + str1.toString();
		mynum = mynum.replace(/^.*(\d\d\d)/,"$1");
		mynum = '《<a href="../AA/AA' + mynum + '.htm" target="_blank">增壹阿含' + str1.toString() + '經</a>》';
  		return mynum;
  	}
	);
	$(obj_div).html(mycomp);
}


note_array = new Array();

// 滑鼠移到註解時要秀出註解視窗

function note(obj,num)
{
	show_note(obj,num,0);	// 表示是全面的註解
}

function local(obj,num)
{
	show_note(obj,num,1);	// 表示是單一檔案的註解
}

function show_note(obj,num,local)
{
	in_word_div = 1;				// 表示滑鼠進入 名相文字
	loading = "載入中...";		// 第一次載入時的呈現文字
	
	// 先指定滑鼠 onMouseOut 的行為, 讓視窗消失
	$(obj).mouseout(function(){
		in_word_div = 0;
	});
	
	// 用 Ajax 讀取資料
	$("#notediv").html(loading);
	
	// 如果是讀過的檔案, 由陣列讀取資料
	if(local == 0)
	{
		filenum = Math.floor(num/100);
		// 這是讀取全面的註解
		if(note_array[filenum])
		{
			$("#notediv").html(note_array[filenum]);
			str = "#notediv #div" + num;
			$("#notediv").html($(str).html());
		}
		else
		{
			str = "../note/note" + filenum + ".htm #div" + num;		
			$("#notediv").load(str,function(data){
				note_array[filenum] = data;		// 全部資料放在 note_array 陣列中
			});
		}
		add_agama_link("#notediv");
	}
	else
	{
		// 這是讀取單一檔案的註解
		str = "#note" + num;
		$("#notediv").html($(str).html());
	}
	
	// 呈現並調整框的位置
	$("#notediv").show();
	
	// 找出文字的上一層是在左邊或右邊
	var $myparent = $("#ext-comp-1004");	// 預設是左邊
	if($(obj).parent().parent().attr('id') == "east")
	{
		$myparent = $("#ext-comp-1003");
	}
	
	$("#notediv").css("top", $(obj).position().top + $myparent.position().top + 53);
	$("#notediv").css("left", $(obj).position().left + $myparent.position().left);
	if($(obj).position().left + $myparent.position().left + $("#notediv").width() > $(window).width())
	{
		$("#notediv").css("left", $(window).width() - $("#notediv").width() - 40);
	}
	if($("#notediv").position().top + $("#notediv").height() + $myparent.position().top - $(window).scrollTop() - 80  > $(window).height())
	{
		$("#notediv").css("top", $(obj).position().top  + $myparent.position().top - $("#notediv").height() + 1);
	}
	if($("#notediv").position().top < $(window).scrollTop())
	{
		$("#notediv").css("top", $(obj).position().top + $myparent.position().top + 53);
	}
}


function check_note_div()
{
	if (in_word_div == 0 && in_note_div == 0)
	{
		$("#notediv").hide();
	}
	else
	{
		$("#notediv").show();
	}
}
