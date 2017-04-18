function getDaysFromWeekNum(wnum, year){
	var simple = new Date(year, 0, 1 + (wnum - 1) * 7);
	var dow = simple.getDay();
	var ISOweekStart = simple;
	if (dow <= 4)
		ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
	else
		ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
	return ISOweekStart;	
}
	
function getWeekOfYear(date){
	var d = new Date(+date);
	d.setHours(0,0,0);
	d.setDate(d.getDate()+4-(d.getDay()||7));
	return Math.ceil((((d-new Date(d.getFullYear(),0,1))/8.64e7)+1)/7);
};

function get5DaysWeekFromWeekNumber(weekNumber, year){
	var d1 = getDaysFromWeekNum(weekNumber, year);
	var d2 = addDays(d1, 1);
	var d3 = addDays(d1, 2);
	var d4 = addDays(d1, 3);
	var d5 = addDays(d1, 4);
	
	return [d1, d2, d3, d4, d5];
}

function get5DaysWeekFromDate(date){
	var wn = getWeekOfYear(date);
	
	return get5DaysWeekFromWeekNumber(wn, 2017);
}

function addDays(date, days){
	var returnDate = new Date(
							date.getFullYear(),
							date.getMonth(),
							date.getDate()+days,
							date.getHours(),
							date.getMinutes(),
							date.getSeconds());
	
	return returnDate;
}

module.exports = {
	get5DaysWeekFromWeekNumber : get5DaysWeekFromWeekNumber,
}