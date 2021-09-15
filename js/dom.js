function uploadImage(json) {
    document.getElementById('uploading').style.display = 'none';
    document.getElementById('uploaded-contents').style.display = 'flex';
    document.getElementById('uploaded-image').setAttribute('src', 'api/uploaded_file/' + json.img_name);
    document.getElementById('copy-link-text').setAttribute('value', 'localhost/image-uploader-master/api/uploaded_file/' + json.img_name);
}

const fileArea = document.getElementById('drop-area');
fileArea.addEventListener('dragover', function(e) {
    e.preventDefault();
});

fileArea.addEventListener('dragleave', function(e) {
    e.preventDefault();
});

fileArea.addEventListener('drop', function(e) {
    e.preventDefault();
    const requestURL = './api/res.php';
    let imgName = e.dataTransfer.files[0].name;
    const fileReader = new FileReader();
    fileReader.readAsDataURL(e.dataTransfer.files[0]);
    fileReader.addEventListener('load', function(e) {
        const img = fileReader.result.replace(/data:.*\/.*;base64,/, '');
        const data = {
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
            if (typeof(json) == 'string') {
                alert(json);
            } else {
                console.log(json);
                document.getElementById('main').style.display = 'none';
                document.getElementById('uploading').style.display = 'flex';
                setTimeout(() => {
                    uploadImage(json);
                }, 3000);
            }
        })
        .catch (e => {
            alert("エラー");
        })
    });
});

document.getElementById('submit_button').addEventListener('change', function(e) {
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
            if (typeof(json) == 'string') {
                alert(json);
            } else {
                document.getElementById('main').style.display = 'none';
                document.getElementById('uploading').style.display = 'flex';
                setTimeout(() => {
                    uploadImage(json);
                }, 3000);
            }
        })
        .catch (e => {
            alert("エラー");
        })
    });
});

document.getElementById('copy-link-button').addEventListener('click', function() {
    let copyTarget = document.getElementById('copy-link-text');
    copyTarget.select();
    if(navigator.clipboard == undefined) {
        window.clipboardData.setData('Text', copyTarget.getAttribute('value'));
    } else {
        navigator.clipboard.writeText(copyTarget.getAttribute('value'));
    }
});