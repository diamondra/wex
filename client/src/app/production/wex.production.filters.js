appProduction.filter('toMoment', function() 
{
    return function(dt) 
    {
        return moment(dt, "X");
    };
});
