<?php
header("Content-Type: application/json; charset=utf-8");
if(is_uploaded_file($_FILES['up_file']['tmp_name'])) {
    $img_name = $_FILES['up_file']['name'];
    if(move_uploaded_file($_FILES['up_file']['tmp_name'],"./".$img_name)){
        // echo "<img src='" . $img_name . "'>";
        // header("Location:index.html");
        $json = $img_name;
        echo json_encode($json);
    } else {
        echo "error while saving.";
    }
} else {
    echo "file not uploaded.";
}