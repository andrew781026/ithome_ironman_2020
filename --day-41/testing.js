const {Application} = require('spectron');
const assert = require('assert');

const wait = seconds => new Promise(resolve => setTimeout(resolve, seconds * 1000))

const func01 = async () => {

    const appPath = 'D:\\test\\ithome_ironman_2020\\day-29\\build\\win/cat.exe';

    const app = new Application({
        path: appPath,
    })

    await app.start();
    await wait(3)

    console.log(' app.client=', app.client)
    console.log(' app.electron=', app.electron)
    console.log(' app.webContents=', app.webContents)
    console.log(' app.mainProcess=', app.mainProcess)
    console.log(' app.browserWindow=', app.browserWindow)

    if (app && app.isRunning()) {

        try {
            console.log(app.stop)
            app.stop();

        } catch (e) {
            console.error(e);
        }

    }

    return null;
};

func01()
    .catch(function (error) {
        // Log any failures
        console.error('Test failed', error.message)
    });

process.on('unhandledRejection', err => {
    console.error(err)
    process.exit(0)
});