const getTimeString = (time) => {
    const hour = parseInt(time / 3600);
    const seconds = parseInt(time % 3600)
    const minute = parseInt(seconds / 60)
    const second = (seconds % 60)
    return `${hour} hours, ${minute} minutes, ${second} seconds`;
}
const result = getTimeString(5325);
console.log(result);