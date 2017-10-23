
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\[").replace(/[\]]/, "\]");
    var regex = new RegExp("[\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function numberWithCommas(x, sep, decimalPlaces) {
    if (!decimalPlaces) {
        decimalPlaces = 1;
    }

    var parts = x.toFixed(decimalPlaces).split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, sep);
    return parts.join(".");
}

Ext.define('params', {
    urlPrefix: "",
    userId: "",
    noPlants: 5,
    app: "",
    dateFormat: "d.m.Y",
    thousandSep: ",",
    userName: "",
    sessionId: "",
    baseUrl: "",
    schPath: "../../ZCXBS_1045_EXTJ",
    language: "es-MX",
    isBatcher: false
})

var app = '';
var isGw = getParameterByName('gw') == 'X' ? true : false;
var schPath;

if (isGw) {
    params.urlPrefix = "../";
    params.schPath = "../../ZCXBS_1045_EXTJ";
    params.app = '../app';
    params.userId = "";
    params.sessionId = getParameterByName('session_id');

    if (getParameterByName('language')) {
        params.language = getParameterByName('language');
    }

    params.baseUrl = "../../../../../../";
} else {
    params.urlPrefix = "http://localhost:9010/";
    params.schPath = "http://localhost:9010/";
    params.app = 'app';
    params.userId = "jgarciag";
    params.sessionId = getParameterByName('session_id');

    if (getParameterByName('language')) {
        params.language = getParameterByName('language');
    }

    params.baseUrl = "http://mxoccsapegd01.noam.cemexnet.com:8000/";
}

Ext.Loader.setConfig({ enabled: true, disableCaching: false });
Ext.Loader.setPath('Sch', params.schPath + '/Sch');

Ext.require([
    'Sch.panel.SchedulerGrid'
]);


/* Agrega el Prototipo de Array el método indexOf, ya que en internet Explorer  no lo tiene implementado*/
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (obj, start) {
        for (var i = (start || 0), j = this.length; i < j; i++) {
            if (this[i] === obj) { return i; }
        }
        return -1;
    }
}

Ext.override(Ext.dom.Element, {
    setStyle: function (prop, value) {
        var fixBadValue = function (val) {
            var result = val;
            var re = new RegExp(/NaNpx/ig);
            if (val) {
                if (val.search) {
                    if (val.search(re) > -1) {
                        result = "inherit"; //not sure if 'inherit' is the proper global fix
                    }
                }
            }
            return result;
        };

        var _prop = prop;
        var _value = fixBadValue(value);

        if (_prop) {
            for (var name in _prop) {
                _prop[name] = fixBadValue(_prop[name]);
            }
        }

        return this.callSuper([_prop, _value]);
    }
});

if (Ext.isIE && Ext.ieVersion < 9 && window.top !== window) {
    Ext.dd.DragDropManager.notifyOccluded = true;
}

function getTridentVerssion() {
    var aux;    

    try
    {
        aux = navigator.userAgent.indexOf("Trident/");

        return parseFloat(navigator.userAgent.substring(aux + 8, aux + 11));
    }
    catch(e)
    {
        return 0;
    }
}

Ext.application({
    name: 'Test43',
    extend: 'Test43.Application',
    appFolder: params.app,
    autoCreateViewport: true,

    init: function () {
    }

});

window.onbeforeunload = function () {
    try
    {
        delete Ext;
        delete Test43;
	delete params;
    }
    catch(e)
    {
    }

    //alert("calses borradas");

    return;
}


Ext.Ajax.timeout = 300000; // 300 seconds 
Ext.override(Ext.form.Basic, {     timeout: Ext.Ajax.timeout / 1000 });
Ext.override(Ext.data.proxy.Server, {     timeout: Ext.Ajax.timeout });
Ext.override(Ext.data.Connection, {     timeout: Ext.Ajax.timeout });