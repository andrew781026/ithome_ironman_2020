const electronInstaller = require('electron-winstaller');

const func01 = async () => {

  // NB: Use this syntax within an async function, Node does not have support for
  //     top-level await as of Node 12.
  try {
    await electronInstaller.createWindowsInstaller({
      appDirectory: 'D:\\test\\ithome_ironman_2020\\day-37',
      outputDirectory: 'D:\\test\\ithome_ironman_2020\\day-37\\output',
      authors: 'My App Inc.',
      exe: 'myapp.exe'
    });
    console.log('It worked!');
  } catch (e) {
    console.log(`No dice: ${e.message}`);
  }

}

func01().then(console.log).catch(console.error)
