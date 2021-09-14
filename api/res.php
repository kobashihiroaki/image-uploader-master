<?php
header("Content-Type: application/json; charset=utf-8");
$path = __DIR__ . '\\uploaded_file\\';
$data = json_decode(file_get_contents('php://input'), true);

if($data) {
    $image= base64_decode($data['image']);
    $file_path = $path . $data['img_name'];
    file_put_contents($file_path, $image);  
    echo json_encode($data);
} else {
    echo json_encode('file not uploaded.');
}