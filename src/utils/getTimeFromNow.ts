import moment from 'moment';

const getTimeFromNow = (time: number) => {
  const timeDiff = moment().diff(moment(time), 'days');

  const timeFromNow =
    timeDiff > 1
      ? moment(time).format('MM-DD-yyyy')
      : timeDiff === 1
      ? 'Yesterday'
      : moment(time).fromNow();

  return timeFromNow;
};

export default getTimeFromNow;
