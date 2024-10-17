Page({
  data: {
    saturdays: []
  },

  getSaturday: function () {
    var year = getDate().getFullYear();
    var month = getDate().getMonth() + 1;
    var date = getDate(year, month - 1, 1);
    var saturdays = [];

    function formatDate(date) {
      var day = date.getDate().toString().padStart(2, '0');
      var month = (date.getMonth() + 1).toString().padStart(2, '0');
      var year = date.getFullYear();
      return day + ":" + month + ":" + year;
    }

    while (date.getDay() !== 6) {
      date.setDate(date.getDate() + 1);
    }

    while (date.getMonth() === month - 1) {
      var findDate = formatDate(getDate(date));
      this.setData({
        saturdays: [...saturdays, findDate]
      })
      date.setDate(date.getDate() + 7);
    }

    console.log(`saturday: ${this.data.saturdays}`);


  }
});