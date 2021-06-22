// Constructor function
function Weather(cityName, description) {
    this.cityName = cityName;
    this.description = description;
    this._teamperature = '';
};

Object.defineProperty(Weather.prototype, 'temperature', {
    get: function() {
        return this._teamperature;
    },
    set: function(value) {
        this._teamperature = (value).toFixed(2) + ' C.';
    }
});