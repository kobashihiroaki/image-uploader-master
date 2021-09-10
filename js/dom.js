const submit_button = document.getElementById("submit_button");
submit_button.addEventListener('input', () => {
    console.log('なんすか？');
    const requestUrl = './api/res.php';
    const uploadFile = document.getElementById('submit_button').files[0];
    fetch(requestUrl, {
        method: 'POST',
        body: JSON.stringify(uploadFile),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then (response => {
        console.log('ok');
        console.log(uploadFile);
        return response.json();
    })
    .then (json => {
        console.log(json);
    })
    .catch (e => {
        alert("エラー");
    })
});