const {spawn} = require('child_process');

const exe = 'D:/test/ithome_ironman_2020/day-35/installer/electron-autoupdate-Setup-7.1.0.exe';
const args = ["--updated"];

const doInstall = (exe, args) => {

    return new Promise((resolve, reject) => {

        const process = spawn(exe, args, {
            detached: true,  // 讓執行緒與 NodeJS 脫鉤
            stdio: "ignore",
        })
        process.on("error", error => reject(error))
        process.unref()

        if (process.pid) resolve(true);
    })
}

doInstall(exe, args).catch(err => console.error(err))
