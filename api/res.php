<?php
header("Content-Type: application/json; charset=utf-8");
$path = __DIR__ . '\\uploaded_file\\';
$data = json_decode(file_get_contents('php://input'), true);

if($data) {
    $ext = pathinfo($data['img_name'], PATHINFO_EXTENSION);
    if ($ext === 'jpg' || $ext === 'jpeg' || $ext === 'png') {
        $image= base64_decode($data['image']);
        $file_path = $path . $data['img_name'];
        file_put_contents($file_path, $image);
        $file = glob($path . '*');
        $file_name = basename($file[0]);
        rename($path.$file_name, $file_path);
        echo json_encode($data);
    } else {
        echo json_encode('This extension is not supported.');
    }
} else {
    echo json_encode('File not uploaded.');
}