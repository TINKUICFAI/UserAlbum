const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const JWTSECRET = process.env.JWTSECRET;
const messages = require("./messages");

module.exports = function () {
  const resp = (response, lang, m = "success", data = {}, code = 1) => {
    return response.send({
      message: messages(lang)[m],
      data,
      code,
    });
  };

  const getErrorMessage = (errors) => {
    console.log("Helpers => getErrorMessage");

    try {
      console.log(errors);
      for (var key in errors) {
        let rule = errors[key]["rule"];

        let exists = messages()[rule];
        if (exists) return messages()[rule](key)["en"];

        return errors[key]["message"];
      }
    } catch (ex) {
      return "Something is wrong, Please try again later !!" + ex.message;
    }
  };

  const generateOTP = (length = 6) => {
    // return "123456";

    return 1000 + Math.floor(Math.random() * 9000);
  };

  const createJWT = (payload) => {
    return jwt.sign(payload, JWTSECRET, {
      // expiresIn: "30d", // expires in 30 days
    });
  };

  const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    return hash;
  };

  const checkPassword = async (password, hash) => {
    console.log("Helpers => checkPassword");

    let result = await bcrypt.compare(password, hash);
    return result;
  };

  const sendNotification = async (
    device_token,
    device_type,
    title,
    body,
    data = {},
    userId
  ) => {
    console.log("Helpers => sendNotification");
    let notification_data = {
      device_token,
      device_type,
      title,
      body,
      data: JSON.stringify(data),
      userId,
    };
    data.message_id = result._id;
    var message = {
      //this may vary according to the message type (single recipient, multicast, topic, et cetera)
      to: device_token,
      collapse_key: "your_collapse_key",

      notification: {
        title: title,
        body: body,
      },

      data: {
        //you can send only notification or only data(or include both)
        my_key: "my value",
        my_another_key: "my another value",
      },
    };
    console.log(message);
  };

  const getWeeks = async () => {
    console.log("Helpers => getWeeks");

    var dta = [];
    var dta1 = [];
    const weekDate = [];
    let monthDate = {};
    let yearDate = {};
    var lastSunday = [];
    var lastSaturday = [];

    Date.prototype.getWeek = function () {
      return [new Date(this.setDate(this.getDate() - this.getDay()))].concat(
        String(Array(6))
          .split(",")
          .map(function () {
            return new Date(this.setDate(this.getDate() + 1));
          }, this)
      );
    };

    if (1) {
      const gg = new Date().getWeek(); //=> [07/10/2012, ... ,13/10/2012]

      for (const item of gg) {
        const yyyy = item.getFullYear();
        let mm = item.getMonth() + 1; // Months start at 0!
        let dd = item.getDate();

        if (dd < 10) dd = "0" + dd;
        if (mm < 10) mm = "0" + mm;

        const LastSundays = yyyy + "-" + mm + "-" + dd;

        weekDate.push(LastSundays);
      }
    }

    if (1) {
      // Thu Apr 30 2009 01:22:46 GMT-0600
      function getLastWeeksDate(mydate) {
        const now = new Date(mydate);

        return new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
      }

      var datee = new Date();
      // const ggDate = [];

      for (let i = 0; i < 7; i++) {
        if (!Date.prototype.getLastSunday)
          Date.prototype.getLastSunday = function () {
            var dat = new Date(this.valueOf());

            dat.setDate(dat.getDate() - (dat.getDay() || 7));
            return dat;
          };

        if (!Date.prototype.getLastSaturday)
          Date.prototype.getLastSaturday = function () {
            var dat = new Date(this.valueOf());

            dat.setDate(dat.getDate() - (dat.getDay() || 1));
            return dat;
          };

        let LastSunday = datee.getLastSunday();
        let LastSaturday = datee.getLastSaturday();

        const yyyy = LastSunday.getFullYear();
        let mm = LastSunday.getMonth() + 1; // Months start at 0!
        let dd = LastSunday.getDate();

        if (dd < 10) dd = "0" + dd;
        if (mm < 10) mm = "0" + mm;

        LastSunday = yyyy + "-" + mm + "-" + dd;

        const tttt = LastSaturday.getFullYear();
        let nn = LastSaturday.getMonth() + 1; // Months start at 0!
        let cc = LastSaturday.getDate();

        if (cc < 10) cc = "0" + cc;
        if (nn < 10) nn = "0" + nn;

        LastSaturday = tttt + "-" + nn + "-" + cc;

        lastSaturday.push(LastSaturday);

        lastSunday.push(LastSunday);

        datee = getLastWeeksDate(datee);
      }

      monthDate = { lastSunday, lastSaturday };
    }

    if (1) {
      dta = [];
      dta1 = [];
      for (var i = 0; i < 12; i++) {
        function addMonths(date, months) {
          date.setMonth(date.getMonth() + months);
          return date;
        }

        let LastSunday = addMonths(new Date(), -i);

        const yyyy = LastSunday.getFullYear();
        let mm = LastSunday.getMonth() + 1; // Months start at 0!
        let dd = LastSunday.getDate();

        if (dd < 10) dd = "0" + dd;
        if (mm < 10) mm = "0" + mm;

        let ppe = yyyy + "-" + mm + "-01";
        // January
        function LastDayOfMonth(Year, Month) {
          return new Date(new Date(Year, Month, 1) - 1);
        }

        let dte1 = LastDayOfMonth(yyyy, mm);

        let tttt = dte1.getFullYear();
        let nn = dte1.getMonth() + 1;
        let cc = dte1.getDate();

        if (cc < 10) cc = "0" + cc;
        if (nn < 10) nn = "0" + nn;

        dte1 = tttt + "-" + nn + "-" + cc;

        dta.push(ppe);
        dta1.push(dte1);
      }

      yearDate = { dta, dta1 };
    }

    return { weekDate, monthDate, yearDate };
  };

  return {
    generateOTP,
    resp,
    getErrorMessage,
    createJWT,
    hashPassword,
    checkPassword,
    sendNotification,
    getWeeks,
  };
};
