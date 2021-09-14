const file = document.getElementById("submit_button");
file.addEventListener('change', function(e) {
    const requestURL = './api/res.php';
    let img_name = e.target.files[0]['name'];
    let fileReader = new FileReader();
    fileReader.readAsDataURL(e.target.files[0]);
    fileReader.addEventListener('load', function(e) {
        let img = fileReader.result.replace(/data:.*\/.*;base64,/, '');
        let data = {
            'image': img,
            'img_name': img_name
        }

        console.log(data);

        fetch(requestURL, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then (response => {
            console.log('ok');
            return response.json();
        })
        .then (json => {
            console.log('success')
            console.log(json);
        })
        .catch (e => {
            alert("エラー");
        })
    });
});