<?
ini_set('display_errors', 0);
$keyword = $_GET['keyword'];
if($keyword==""){$keyword="1.1";}
$i ="0001";
$path = "sn.txt";
if(file_exists ($path) == false){echo "<center>抱歉！資料庫正更新中，請5分鐘後再使用。<br><br><br><br><br><br><br><br><br><br><br><br><br><br>"; exit;}
$file=fopen($path, "r");
for($j=0;$j<2752;$j++)
{
	$buffer=fgets($file,2048);
	$t = mb_substr($buffer, 0, 4, "utf8");
	$sn = mb_substr($buffer, 4, 6,"utf8");
	if($a = strstr($sn,$keyword)!=false)
	{$i = $t; $j=3000;}
}
fclose($file);
$p = "SN".$i.".htm";

echo "<script>";
echo "  location.replace(\"$p\");";
echo "</script>";
?>
