commonApp.factory('utilityService', function($log,$filter,$q,$location ){
  var service = {
    isEmptyObj: function (obj) {
      if (obj === undefined) {
        return true;
      } else if (obj === null) {
        return true;
      } else if (angular.isArray(obj) === true) {
        var item;
        for (item in obj) {
          return false;
        }
      } else if (obj.length === 0) {
        return true;
      } else {
        return false;
      }
    },

    getUrlParameter: function (sParam) {
      var sPageURL = window.location.search.substring(1);
      var sURLVariables = sPageURL.split('&');
      for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
          return sParameterName[1];
        }
      }
    },
    formatDate: function (date, type) {
      if (service.isEmptyObj(date) === true) return;
      try {
        var newDate = new Date(date);
        newDate.setHours(0, 0, 0, 0);
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        var todayDate = $filter('date')((new Date()), 'MMM dd');

        switch (type) {
          case 'date':
            return $filter("date")(date, 'MMM dd');
          case 'year':
            return $filter("date")(date, 'MMM dd, yyyy');
          case 'time':
            return $filter("date")(date, 'h:mm a');
          default:
            if (newDate.getTime() == today.getTime()) {
              return $filter("date")(date, 'h:mm a');
            } else {
              return $filter("date")(date, 'MMM dd, h:mm a');
            }
        }
      } catch (e) {
        $log.debug('Format time error: ', e)
      }
    },
    getNearestSearchTime: function (dt) {
      var hour = parseInt($filter('date')(dt, 'H'));
      var min = (Math.floor(parseInt($filter('date')(dt, 'm')) / 15) + 1 ) * 15;
      if (min == 60) {
        hour++;
        min = '00'
      }
      if (hour < 10) {
        hour = '0' + hour
      } else if (hour == 24){
        hour = '00';
      }
      return hour.toString() + ':' + min.toString() + ':00';
    },
    getCookie: function (cookieName) {
      return $.cookie(cookieName)
    },
    setCookie: function (cookieName, val) {
      $.cookie(cookieName, val, {path: '/', secure: true});
    },
    clearCookie: function (name) {
      $.removeCookie(name, {path: '/', secure: true});
    },
    getMonthYear: function (years, months) {
      var dt = new Date();
      dt.setMonth(dt.getMonth() - months - years * 12);
      return $filter('date')(dt, 'MMM. yyyy');
    },
    handleError: function (response, display) {
      $log.debug('Error message full details:', response);
      var errorObj = {
        errorCode: response.status,
        disable: display || false
      };
      if (service.isEmptyObj(response.data.is_generic) === false) {
        errorObj.isCustomizeError = !response.data.is_generic;
        errorObj.errorMessage = response.data.message;
        $log.debug('Customize Error Details: ', errorObj);
      } else {
        errorObj.isCustomizeError = false;
        errorObj.errorMessage = response.data;
        $log.debug('Generic Error Details: ', errorObj);
      }
      service.errors = errorObj;
      return errorObj;
    },
    getErrorObj: function () {
      return angular.copy(service.errors);
    },

    getGreeting: function () {
      var hour = new Date().getHours();
      if (hour < 12) {
        hour = "Good morning"
      }
      else if (hour >= 12 && hour < 17) {
        hour = "Good afternoon"
      }
      else if (hour >= 17) {
        hour = "Good evening"
      }
      return hour;
    },
    getPastNYears: function (N) {
      var currentYear = (new Date()).getFullYear();
      var years = [];
      for (var i = 0; i < N; i++) {
        years.push(currentYear - i);
      }
      return years;
    },

    TimeZones: [
      'US/Eastern', 'US/Central', 'US/Mountain', 'US/Arizona', 'US/Pacific', 'US/Alaska', 'US/Hawaii'
    ],
    TimeSlots: [
      '00:00:00', '00:15:00', '00:30:00', '00:45:00',
      '01:00:00', '01:15:00', '01:30:00', '01:45:00',
      '02:00:00', '02:15:00', '02:30:00', '02:45:00',
      '03:00:00', '03:15:00', '03:30:00', '03:45:00',
      '04:00:00', '04:15:00', '04:30:00', '04:45:00',
      '05:00:00', '05:15:00', '05:30:00', '05:45:00',
      '06:00:00', '06:15:00', '06:30:00', '06:45:00',
      '07:00:00', '07:15:00', '07:30:00', '07:45:00',
      '08:00:00', '08:15:00', '08:30:00', '08:45:00',
      '09:00:00', '09:15:00', '09:30:00', '09:45:00',
      '10:00:00', '10:15:00', '10:30:00', '10:45:00',
      '11:00:00', '11:15:00', '11:30:00', '11:45:00',
      '12:00:00', '12:15:00', '12:30:00', '12:45:00',
      '13:00:00', '13:15:00', '13:30:00', '13:45:00',
      '14:00:00', '14:15:00', '14:30:00', '14:45:00',
      '15:00:00', '15:15:00', '15:30:00', '15:45:00',
      '16:00:00', '16:15:00', '16:30:00', '16:45:00',
      '17:00:00', '17:15:00', '17:30:00', '17:45:00',
      '18:00:00', '18:15:00', '18:30:00', '18:45:00',
      '19:00:00', '19:15:00', '19:30:00', '19:45:00',
      '20:00:00', '20:15:00', '20:30:00', '20:45:00',
      '21:00:00', '21:15:00', '21:30:00', '21:45:00',
      '22:00:00', '22:15:00', '22:30:00', '22:45:00',
      '23:00:00', '23:15:00', '23:30:00', '23:45:00'
    ],
    days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    states: ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'],
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    errors: {},
    weekDaysAdapter: function (day, type) {
      if (type === 'get') {
        if (day === 7) {
          return 0;
        }
      } else {
        if (day === 0) {
          return 7;
        }
      }
      return day;
    },
    kgtolb: function (w) {
      return Math.round(w / .45)
    },
    cmtoin: function (h) {
      return Math.round(h * .393701)
    }
  };


  return service;
});

