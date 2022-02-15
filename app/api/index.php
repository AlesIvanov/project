<?php

$htmlFiles = glob("../../*.html");
$response = [];

foreach ($htmlFiles as $file) {
    $response[] = basename($file);
}

echo json_encode($response);
