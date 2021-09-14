document.getElementById('submit_button').addEventListener('change', function(e) {
    document.getElementById('main').style.display = 'none';
    const requestURL = './api/res.php';
    let imgName = e.target.files[0]['name'];
    let fileReader = new FileReader();
    fileReader.readAsDataURL(e.target.files[0]);
    fileReader.addEventListener('load', function(e) {
        let img = fileReader.result.replace(/data:.*\/.*;base64,/, '');
        let data = {
            'image': img,
            'img_name': imgName
        }

        fetch(requestURL, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then (response => {
            return response.json();
        })
        .then (json => {
            
        })
        .catch (e => {
            alert("エラー");
        })
    });
    document.getElementById('uploaded-contents').style.display = 'block';
});