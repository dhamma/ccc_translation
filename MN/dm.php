<?
ini_set('display_errors', 0);
$keyword = $_GET['keyword'];
$i= floor ($keyword);
if($i<1){$i=1;}
if($i>152){$i=152;}
if($i<10){$p = "MN00".$i.".htm";}
if($i>9 and $i<100){$p = "MN0".$i.".htm";}
if($i>99 and $i<1000){$p = "MN".$i.".htm";}
echo "<script>";
echo "  location.replace(\"$p\");";
echo "</script>";
?>
