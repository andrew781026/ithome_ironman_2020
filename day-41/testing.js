const Application = require('spectron').Application;
const assert = require('assert');

const func01 = async () => {

    const appPath = 'D:\\test\\ithome_ironman_2020\\day-29\\build\\win/cat.exe';

    const app = new Application({
        path: appPath,
    })

    await app.start();

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