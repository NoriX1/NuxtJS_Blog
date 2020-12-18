const moment = require('moment');

export default (value, dateFormat) => {
  if (dateFormat) {
    return moment(value).format(dateFormat);
  } else {
    return moment(value).format('DD.MM.YYYY HH:mm');
  }
};
