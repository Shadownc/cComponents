import { Message } from 'element-ui';
export const copyTextToClipboard = (text) => {
    const textarea = document.createElement('textarea');
    textarea.textContent = text;
    document.body.appendChild(textarea);
    textarea.select();
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            Message.success('复制成功')
        }

    } catch (err) {
        Message.error('复制失败')

    } finally {
        document.body.removeChild(textarea);
    }
}

export const downloadImage = (baseData) => {
    // 解码Base64字符串
    const byteCharacters = atob(baseData.split(',')[1]);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);

    // 创建Blob对象
    const blob = new Blob([byteArray], { type: 'image/png' });

    // 创建URL
    const url = URL.createObjectURL(blob);

    // 创建隐藏的<a>元素
    const link = document.createElement('a');
    link.href = url;
    link.download = `${generateRandomString(7)}_yz.png`; // 设置下载的文件名

    // 触发点击事件
    document.body.appendChild(link);
    link.click();

    // 移除链接并释放内存
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

function generateRandomString(length) {
    // 生成一个[0, 1)范围内的随机数
    let randomNum = Math.random();

    // 将随机数转换为36进制字符串
    let randomStr = randomNum.toString(36);

    // 如果生成的字符串长度小于目标长度，则重复扩展
    while (randomStr.length < length) {
        randomStr += randomStr;
    }

    // 截取指定长度的字符串
    return randomStr.substring(0, length);
}