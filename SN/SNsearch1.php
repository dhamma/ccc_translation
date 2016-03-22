<?
ini_set('display_errors', 0);
$keyword = $_GET["str"];
$color1 = "#FF00FF";
$path =  $_GET["path"];
$keyword = str_replace("♀", " ", $keyword);
if (file_exists ($path))
{
	$file=fopen($path,"r");
	$buffer = file_get_contents($path);
	fclose($file);
	$keyword1 = "<script language=".chr(34)."javascript".chr(34).">document.writeln(document.lastModified);</script>";
	$change1 = strftime ("%m/%d/%Y %H:%M:%S.", filemtime($path));
	$change1 = $change1."美西時間";
	$change = "<font color=".$color1."><b><u>".$keyword."</u></b></font>";
	$buffer = str_replace($keyword, $change, $buffer);
	$buffer = str_replace($keyword1, $change1, $buffer);
	$keyword2 = "/js/ext/re<font color=#FF00FF><b><u>source</u></b></font>";
	$change2 = "/js/ext/resource";
	$keyword3 = "/js/ext/<font color=#FF00FF><b><u>resource</u></b></font>";
	$change3 = "resource";
	$keyword4 = "/js/ext/<font color=#FF00FF><b><u>resources</u></b></font>";
	$change4 = "resources";
	$buffer = str_replace($keyword2, $change2, $buffer);
	$buffer = str_replace($keyword3, $change3, $buffer);
	$buffer = str_replace($keyword4, $change4, $buffer);
	echo $buffer;
}
?>
