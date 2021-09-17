function uploadImage(json) {
    document.getElementById('uploading').style.display = 'none';
    document.getElementById('uploaded_contents').style.display = 'flex';
    document.getElementById('uploaded_image').setAttribute('src', 'api/uploaded_file/' + json.img_name);
    document.getElementById('copy_link_text').setAttribute('value', 'localhost/image-uploader-master/api/uploaded_file/' + json.img_name);
}

const fileArea = document.getElementById('drop_area');
fileArea.addEventListener('dragover', function(e) {
    e.preventDefault();
});

fileArea.addEventListener('dragleave', function(e) {
    e.preventDefault();
});

fileArea.addEventListener('drop', (e) => {
    e.preventDefault();
    let imgName = e.dataTransfer.files[0].name;
    const fileType = imgName.split('.').pop();
    if (fileType == 'jpg' || fileType == 'jpeg' || fileType == 'png') {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(e.dataTransfer.files[0]);
        fileReader.addEventListener('load', async() => {
            const img = fileReader.result.replace(/data:.*\/.*;base64,/, '');
            const data = {
                'image': img,
                'img_name': imgName
            }
            const requestURL = './api/res.php';
            try {
                const response = await fetch(requestURL, {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (response.ok) {
                    const resJSON = await response.json();
                    document.getElementById('main').style.display = 'none';
                    document.getElementById('uploading').style.display = 'flex';
                    setTimeout(() => {
                        uploadImage(resJSON);
                    }, 3000);
                } else {
                    throw new Error('Network response was not ok.');
                }
            } catch (error) {
                alert("エラー");
            }
        });
    } else {
        alert('拡張子見ろよ。');
    }
});

document.getElementById('submit_button').addEventListener('change', (e) => {
    const imgName = e.target.files[0]['name'];
    const fileType = imgName.split('.').pop();
    if (fileType == 'jpg' || fileType == 'jpeg' || fileType == 'png') {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(e.target.files[0]);
        fileReader.addEventListener('load', async() => {
            const img = fileReader.result.replace(/data:.*\/.*;base64,/, '');
            const data = {
                'image': img,
                'img_name': imgName
            }
            const requestURL = './api/res.php';
            try {
                const response = await fetch(requestURL, {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (response.ok) {
                    const resJSON = await response.json();
                    document.getElementById('main').style.display = 'none';
                    document.getElementById('uploading').style.display = 'flex';
                    setTimeout(() => {
                        uploadImage(resJSON);
                    }, 3000);
                } else {
                    throw new Error('Network response was not ok.');
                }
            } catch (error) {
                alert("エラー");
            }
        });
    } else {
        alert('拡張子見ろよ。');
    }
});

document.getElementById('copy_link_button').addEventListener('click', () => {
    const copyTarget = document.getElementById('copy_link_text');
    copyTarget.select();
    if(navigator.clipboard == undefined) {
        window.clipboardData.setData('Text', copyTarget.getAttribute('value'));
    } else {
        navigator.clipboard.writeText(copyTarget.getAttribute('value'));
    }
});