app.service('wexHelpers', wexHelpers);

function wexHelpers() {
	this.getDaysFromWeekNum = function (w, y) {
		var simple = new Date(y, 0, 1 + (w - 1) * 7);
		var dow = simple.getDay();
		var ISOweekStart = simple;
		if (dow <= 4)
			ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
		else
			ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
		return ISOweekStart;
	}	
	
	this.getWeekOfYear = function(date){
		var d = new Date(+date);
		d.setHours(0,0,0);
		d.setDate(d.getDate()+4-(d.getDay()||7));
		return Math.ceil((((d-new Date(d.getFullYear(),0,1))/8.64e7)+1)/7);
	};
	
	this.get5DaysWeekFromWeekNumber = function(weekNumber, year){
		var d1 = this.getDaysFromWeekNum(weekNumber, year);
		var d2 = this.addDays(d1, 1);
		var d3 = this.addDays(d1, 2);
		var d4 = this.addDays(d1, 3);
		var d5 = this.addDays(d1, 4);
		
		return [d1, d2, d3, d4, d5];
	}
	
	this.get5DaysWeekFromDate = function(date){
		var wn = this.getWeekOfYear(date);
		
		return this.get5DaysWeekFromWeekNumber(wn, 2017);
	}
	
	this.addDays = function(date, days){
		var returnDate = new Date(
								date.getFullYear(),
								date.getMonth(),
								date.getDate()+days,
								date.getHours(),
								date.getMinutes(),
								date.getSeconds());
		
		return returnDate;
	}
}