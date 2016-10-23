const Time = {
  getTimeFromDate(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    hours = hours >= 10 ? hours : ('0' + hours);
    minutes = minutes >= 10 ? minutes : ('0' + minutes);
    seconds = seconds >= 10 ? seconds : ('0' + seconds);

    return hours + ':' + minutes + ':' + seconds;
  },

  msToTime(duration) {
    let seconds = parseInt((duration / 1000) % 60, 10);
    let minutes = parseInt((duration / (1000 * 60)) % 60, 10);
    let hours = parseInt((duration / (1000 * 60 * 60)) % 24, 10);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds;
  }
}

export default Time;
