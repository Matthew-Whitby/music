<?php
function get_youtube($url){

$youtube = "http://www.youtube.com/oembed?url=". $url ."&format=json";

$curl = curl_init($youtube);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
$return = curl_exec($curl);
curl_close($curl);
return json_decode($return, true);

}

$url = // youtube video url

// Display Data
return(get_youtube($url));
?>
