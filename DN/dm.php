<?
ini_set('display_errors', 0);
$keyword = $_GET['keyword'];
$i= floor ($keyword);
if($i<1){$i=1;}
if($i>34){$i=34;}
if($i<10){$p = "DN0".$i.".htm";}
if($i>9 and $i<100){$p = "DN".$i.".htm";}
echo "<script>";
echo "  location.replace(\"$p\");";
echo "</script>";
?>
