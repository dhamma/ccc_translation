<html>

<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>搜尋增支部</title>
</head>

<body bgcolor="#EDFFE1" link="#54547E" vlink="#005B00" alink="#FF7777">
<style="font-family:Tahoma, Arial Narrow, 標楷體, SimSun">
<center>
<table border="0" cellpadding="0" cellspacing="0" width="98%" bgcolor="#EDFFE1">
    <tr><td><div align="center">
 <table border="0" cellpadding="0" cellspacing="0" width="800" bgcolor="#EDFFE1">
    <tr>
    <td><div align="center">　　<a href="../index.htm"><img border="0" width="100%" src="title0.gif" alt="漢譯相應部/莊春江譯"></a>
<span style="font-size: 18pt; color: #FF0000; font-family:標楷體; letter-spacing:-1.5pt">
  </td>
  </tr></table><div align="center">
<table border="0" cellpadding="0" cellspacing="0" width="95%" bgcolor="#EDFFE1">
    <tr>
     <td><div align="right">
   <form name="search_form" action="an.php"><span style="font-size: 20pt; color: #525000">
 經號：
       <input type="text" name="keyword" style="font-size: 16pt; color: #525000" size="1">
       <input type="submit" name="button1" value="進入" style="font-size: 14pt; background-color: #EDFFE1; color: #003AE8">　　
  </form></div></td>
     <td><div align="left">
   <form name="search_form" action="ANsearch.php">
　　<input type="text" name="keyword" style="font-size: 16pt; color: #54547E"  size="20">
 <input type="submit" name="button1" value="本書內容檢索" style="font-size: 16pt; background-color: #EDFFE1; color: #003AE8"><span style="font-size: 20pt">
   </form></div></td>
    </tr>
  </table>

<center>
  <table border="0" cellpadding="0" cellspacing="1" width="98%" bgcolor="#EDFFE1">
   <tr>
     <td width="100%">
<p style="line-height: 150%; margin-left: 20; margin-right: 10; font-size: 20pt;  color: #006A00; font-family:Tahoma">
您所查詢的「<font color="#CC330">

<?
ini_set('display_errors', 0);
$keyword = $_GET["str"];
$FoundNo = $_GET["fn"];
$done = $_GET["done"];
$keywordlen =mb_strlen($keyword, "utf8");
$FoundNolen =mb_strlen($FoundNo, "utf8");
$donelen =mb_strlen($done, "utf8");
if($keywordlen<1){$phone=1;}
if($FoundNolen<1){$phone=1;}
if($donelen<1){$phone=1;}
if($phone == 1){echo "<script>window.location=\"http://tw.yahoo.com\";</script>";Exit;}
$remain = $FoundNo-$done;
$runf = 0;
$run = 0;
$RunEnd = 30;
$SutraNo=1765;
$keyword = str_replace("♀", " ", $keyword);
echo $keyword;
?>
<font color="#006A00">」相關內容：
<?
echo "(共有".$FoundNo."個經有，此為前面未顯示的".$remain."筆)<br>";
$keywordlen =mb_strlen($keyword, "utf8");
$file1=fopen("an1.txt","r");
for ($i=1; $i<$SutraNo; $i++)
{ 
	$name=fgets($file1,2048);
	if($i<10){$path = "AN000".$i.".htm";}
	if($i>9 and $i<100){$path = "AN00".$i.".htm";}
	if($i>99 and $i<1000){$path = "AN0".$i.".htm";}
	if($i>999 and $i<10000){$path = "AN".$i.".htm";}
	if(file_exists ($path) == false){echo "<center>抱歉！資料庫正更新中，請稍後再使用。<br><br><br><br><br><br><br><br><br><br><br><br><br><br>"; exit;}
	$file=fopen($path,"r");
	$buffer = file_get_contents($path);
	fclose($file);
	$buffer = strip_tags($buffer);
	if($a = strstr($buffer,$keyword)!=false)
	{ 
	$runf = $runf + 1;
	if($runf> $done)
		{
	$change = $keyword;
	$t = str_replace($keyword, $change, $buffer, $count);
	$show = "";
	$countj = $count+1;
	for ($j=1; $j<$countj; $j++)
			{ 
	$bufferlen = mb_strlen($buffer, "utf8");
	$c = strstr($buffer,$keyword);
	$clen = mb_strlen($c, "utf8");
	$tlen = $bufferlen-$clen; 
	$t = mb_substr($buffer, 0, $tlen, "utf8");
	$c1len = $keywordlen+15;
	$c1 = mb_substr($c, 0, $c1len, "utf8");
	$t1 = mb_substr($t, -3, 3, "utf8");
	$buffer = mb_substr($c, $keywordlen, $clen, "utf8");
	$s =$j.")…".$t1.$c1."…";
	$show =$show.$s;
			}
	$change = "<font color=#CC330>".$keyword."</font>";
	$show = str_replace($keyword, $change, $show);
	$keywordT = str_replace(" ", "♀", $keyword);
	$keyword1="str=".$keywordT."&path=".$path;
	$linkdata="ANsearch1.php?".$keyword1;
	$link="(<a href=".$linkdata.">詳細內容</a>)<br>";
	echo "<br>".$name."/第".$i."經(".$count."筆)：<br>".$show."<br>".$link;
	$done=$done+1;
	$run = $run+1;
	$remain=$FoundNo-$done;
	if($run==$RunEnd){$i=$SutraNo;}
		}
	}
}
fclose($file1);
if($remain>0)
{
	$linkdata="ANsearch2.php?"."str=".$keywordT."&fn=".$FoundNo."&done=".$done;
	$link="<br>……<a href=".$linkdata.">看下面".$remain."筆</a>……<br>";
	echo $link;
}
else
{echo "------------------------------------#<br>";}
if($remain<8){$n=8-$remain;for($i=1;$i<$n;$i++){echo "<br>";}}
?>
</tr>
</table>
</center>
</body>
</html>