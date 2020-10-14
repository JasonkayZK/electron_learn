const notifier = require('node-notifier')
const path = require('path')

function doNotify(e) {
    console.log(e);
    notifier.notify({
        title: 'Big news!',
        message: 'No big dual!',
        icon: path.join(__dirname, 'clock.ico'),
        sound: true,
    });
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("basic").addEventListener("click", doNotify);
})
