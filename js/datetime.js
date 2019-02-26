/**
 * Created by ztt on 2019/2/25.
 */

// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1,                 //月份
        "d+": this.getDate(),                    //日
        "h+": this.getHours(),                   //小时
        "m+": this.getMinutes(),                 //分
        "s+": this.getSeconds(),                 //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};

/**
 *  获取当前时间，到秒
 */
function getCurrentDateTime() {
    var time = new Date().Format("yyyy-MM-dd hh:mm:ss");
    return time;
}

/**
 *  获取当前时间，到秒
 */
function getCurrentDate() {
    var time = new Date().Format("yyyy-MM-dd");
    return time;
}

/**
 * 包含今天
 *
 * 今天与明天相差1天
 *
 * 获取时间差多少天
 */
function getDayCha(year, month, day) {
    var d1 = new Date();
    var time1 = d1.getTime();
    d1.setFullYear(year, month, day);
    var time2 = d1.getTime();
    var time = 0;
    if (time1 > time2) {
        time = time1 - time2;
    } else {
        time = time2 - time1;
    }
    var days = time / 1000 / 60 / 60 / 24;
    return Math.abs(days);
}


/**
 * @desc 计算年龄 今天到明天，算是一天
 * 计算年份->计算月份->计算天数
 *
 * @date 2015-09-22
 * @author WadeYu
 */

var getDiffYmdBetweenDate = function (sDate1, sDate2) {

    /*
     不够10的补0
     */
    var fixDate = function (sDate) {
        var aD = sDate.split('-');
        for (var i = 0; i < aD.length; i++) {
            aD[i] = fixZero(parseInt(aD[i]));
        }
        return aD.join('-');
    };
    var fixZero = function (n) {
        return n < 10 ? '0' + n : n;
    };
    /*
     不够10的去0
     */
    var fixInt = function (a) {
        for (var i = 0; i < a.length; i++) {
            a[i] = parseInt(a[i]);
        }
        return a;
    };
    var getMonthDays = function (y, m) {
        var aMonthDays = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if ((y % 400 === 0) || (y % 4 === 0 && y % 100 !== 0)) {
            aMonthDays[2] = 29;
        }
        return aMonthDays[m];
    };
    var checkDate = function (sDate) {
    };
    var y = 0;
    var m = 0;
    var d = 0;
    var sTmp;
    var aTmp;
    // 不够10的补0 2019-02-26
    sDate1 = fixDate(sDate1);
    // 不够10的补0 2019-02-26
    sDate2 = fixDate(sDate2);
    if (sDate1 > sDate2) {
        sTmp = sDate2;
        sDate2 = sDate1;
        sDate1 = sTmp;
    }

    // 不够10的去0，并分解成数组 2019-02-26
    var aDate1 = sDate1.split('-');
    aDate1 = fixInt(aDate1);
    var aDate2 = sDate2.split('-');
    aDate2 = fixInt(aDate2);

    //计算相差的年份
    y = aDate2[0] - aDate1[0];
    if (sDate2.replace(aDate2[0], '') < sDate1.replace(aDate1[0], '')) {
        y = y - 1;
    }
    //计算月份
    aTmp = [aDate1[0] + y, aDate1[1], fixZero(aDate1[2])];
    while (true) {
        if (aTmp[1] === 12) {
            aTmp[0]++;
            aTmp[1] = 1;
        } else {
            aTmp[1]++;
        }
        if (([aTmp[0], fixZero(aTmp[1]), aTmp[2]]).join('-') <= sDate2) {
            m++;
        } else {
            break;
        }
    }
    //计算天数
    aTmp = [aDate1[0] + y, aDate1[1] + m, aDate1[2]];
    if (aTmp[1] > 12) {
        aTmp[0]++;
        aTmp[1] -= 12;
    }
    while (true) {
        if (aTmp[2] === getMonthDays(aTmp[0], aTmp[1])) {
            aTmp[1]++;
            aTmp[2] = 1;
        } else {
            aTmp[2]++;
        }
        sTmp = ([aTmp[0], fixZero(aTmp[1]), fixZero(aTmp[2])]).join('-');
        if (sTmp <= sDate2) {
            d++;
        } else {
            break;
        }
    }
    return {y: y, m: m, d: d};
};

var getDiffYmd = function (sDate2) {
    return getDiffYmdBetweenDate(getCurrentDate(), sDate2);
};

var aTest = [
    ['2019-2-26', '2019-2-27'],
    ['2019-2-26', '2019-2-26'],
    ['2019-2-26', '2019-3-1'],
];
for (var i = 0; i < aTest.length; i++) {
    console.log(aTest[i][0] + ':' + aTest[i][1]);
    console.log(getDiffYmdBetweenDate(aTest[i][0], aTest[i][1]));
    console.log(getDiffYmd(aTest[i][1]));
}