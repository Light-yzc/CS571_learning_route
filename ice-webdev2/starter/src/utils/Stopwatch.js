const createStopwatch = () => {
    let startMS;

    const PAD_MAX_LEN = 4;

    const start = () => {
        startMS = new Date().getTime();
    }

    const getNum = () => {
        return new Date().getTime() - startMS;
    }

    const getStr = () => {
        return String(getNum()).padStart(PAD_MAX_LEN, '0') + "ms";
    }

    const get = getStr;

    const reset = () => {
        startMS = undefined;
    }

    return {
        start, getNum, getStr, get, reset
    }
}

const Stopwatch = createStopwatch();

export default Stopwatch;