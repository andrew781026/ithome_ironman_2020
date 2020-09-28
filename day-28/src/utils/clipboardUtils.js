const read = clipboard => {

    const availableFormats = clipboard.availableFormats();

    const isImageFormat = availableFormats.find(format => format.includes('image'));
    const isHtmlFormat = availableFormats.find(format => format.includes('text/html'));
    const isTextFormat = availableFormats.find(format => format.includes('text/plain'));
    const isRtfFormat = availableFormats.find(format => format.includes('text/rtf'));

    if (isImageFormat) {

        const nativeImage = clipboard.readImage(); // 取得 clipboard 中的圖片
        return nativeImage.toDataURL(); // data:image/png;

    } else if (isTextFormat) return clipboard.readText(); // 取得 clipboard 中的文字
    else if (isHtmlFormat) return clipboard.readHTML(); // 取得 clipboard 中的 html
    else if (isRtfFormat) return clipboard.readRTF(); // 取得 clipboard 中的 rtf
    else return null;
}

module.exports = {
    read,
}