const now = function() {
	var nowDate = new Date();
	var year = nowDate.getFullYear();
	var month = nowDate.getMonth() + 1 < 10 ? "0" + (nowDate.getMonth() + 1) :
		nowDate.getMonth() + 1;
	var day = nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate
		.getDate();
	var dateStr = year + "-" + month + "-" + day;
	return dateStr;
};
const yestoday = function(num, str) {
	var today = new Date();
	var nowTime = today.getTime();
	var ms = 24*3600*1000*num;
	today.setTime(parseInt(nowTime + ms));
	var oYear = today.getFullYear();
	var oMoth = (today.getMonth() + 1).toString();
	if (oMoth.length <= 1) oMoth = '0' + oMoth;
	var oDay = today.getDate().toString();
	if (oDay.length <= 1) oDay = '0' + oDay;
	return oYear+str+oMoth+str+oDay;
}
const nowMon = function() {
	var nowDate = new Date();
	var year = nowDate.getFullYear();
	var month = nowDate.getMonth() + 1 < 10 ? "0" + (nowDate.getMonth() + 1) :
		nowDate.getMonth() + 1;
	var day = nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate
		.getDate();
	var dateStr = year + "-" + month;
	return dateStr;
}
export default {
	now,yestoday,nowMon
}