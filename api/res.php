<?php
header("Content-Type: application/json; charset=utf-8");
$path = __DIR__ . 'uploaded-file';
$data = json_decode(file_get_contents('php://input'), true);
var_dump($data);

// if(is_uploaded_file($FILES['tmp_name'])) {
//     $img_name = $FILES['tmp_name']['name'];
//     if(move_uploaded_file($FILES['tmp_name']['name'],$path. "/" . $img_name)){
//         $json = $img_name;
//         echo json_encode($json);
//     } else {
//         echo "error while saving.";
//     }
// } else {
//     echo "file not uploaded.";
// }