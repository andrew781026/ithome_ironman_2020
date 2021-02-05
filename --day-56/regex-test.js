const reg = /^(\d{4}-\d{6})$/

const test01 = '0982-052318';
const test02 = '0982-05231815';
const test03 = '480982-052318';
const test04 = '0982052318';

const LogTesting = (str, reg) => console.log( reg.test(str));

LogTesting(test01, reg);
LogTesting(test02, reg);
LogTesting(test03, reg);
LogTesting(test04, reg);
console.log('----------------------------------------')

const reg2 = /^(\d*)$/

LogTesting(test01, reg2);
LogTesting(test02, reg2);
LogTesting(test03, reg2);
LogTesting(test04, reg2);

console.log('----------------------------------------')

const trackFormat = /^([0-9]{1,2}\/[0-9]{2}@\d{4}-\d{4}@.*)$/

const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x);
const compose = (...fns) => (x) => fns.reduceRight((v, f) => f(v), x);

const test05 = '05/12@1214-1324@某個的地方';
const test06 = '5/12@1214-1324@某個的地方';
const test07 = '5/12@1214-1324';
const test08 = '5/12@1214-1377@某個的地方';

LogTesting(test05, trackFormat);
LogTesting(test06, trackFormat);
LogTesting(test07, trackFormat);
LogTesting(test08, trackFormat);

console.log('----------------------------------------')

// 輸入的 track 需要檢查格式
const getTrackInfo = text => {

  const textArr = text.split(/@/ig);

  const between = (x, min, max) => x >= min && x <= max;

  const trackDayChecker = trackDay => {

    // trackDay must be format 05/12 or 5/12

    try {

      const arr = trackDay.split(/\//ig);

      // 月份
      const month = parseInt(arr[0]);

      // 日期
      const day = parseInt(arr[1]);

      // 月份不在 1 ~ 12 之間
      if (!between(month, 1, 12)) return false;

      // 日期不在 1 ~ 31 之間
      else if (!between(day, 1, 31)) return false;

      else return true;

    } catch (err) {

      return false;
    }
  };

  const trackTimeChecker = trackTime => {

    // trackTime must be format 1235-1453

    const timeChecker = time => {

      const hour = parseInt(time.substr(0, 2));
      const minute = parseInt(time.substr(2, 2));

      // 小時不在 0 ~ 24 之間
      if (!between(hour, 0, 24)) return false;

      // 分鐘不在 0 ~ 60 之間
      else if (!between(minute, 0, 60)) return false;

      else return true;
    };

    try {

      const arr = trackTime.split(/-/ig);

      // 開始時間
      const startTime = arr[0];

      // 結束時間
      const endTime = arr[1];

      // startTime 與 endTime 需要符合小時 & 分鐘的格式規範
      return timeChecker(startTime) && timeChecker(endTime);

    } catch (err) {

      return false;
    }
  }

  if (!textArr || textArr.length !== 3) return {msg: 'failed'};

  const trackDay = textArr[0];
  const trackTime = textArr[1];
  const place = textArr[2];

  // Fail to pass the format check
  if (!trackDayChecker(trackDay)) return {msg: 'failed'};

  // Fail to pass the format check
  if (!trackTimeChecker(trackTime)) return {msg: 'failed'};

  return {
    trackDay,
    trackTime,
    place
  };
};

console.log(getTrackInfo(test05))
console.log(getTrackInfo(test06))
console.log(getTrackInfo(test07))
console.log(getTrackInfo(test08))
