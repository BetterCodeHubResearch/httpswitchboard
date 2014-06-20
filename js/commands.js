/*******************************************************************************

    httpswitchboard - a Chromium browser extension to black/white list requests.
    Copyright (C) 2014  Contributors to HTTP Switchboard

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see {http://www.gnu.org/licenses/}.

    Home: https://github.com/gorhill/httpswitchboard
*/

/******************************************************************************/

(function() {

/******************************************************************************/

var whitelistPageDomain = function(tabs) {
    if ( tabs.length === 0 ) {
        return;
    }
    var tab = tabs[0];
    if ( !tab.url ) {
        return;
    }
    var httpsb = HTTPSB;
    if ( httpsb.autoWhitelistTemporarilyPageDomain(tab.url) ) {
        httpsb.smartReloadTab(tab.id);
    }
};

/******************************************************************************/

var whitelistAll = function(tabs) {
    if ( tabs.length === 0 ) {
        return;
    }
    var tab = tabs[0];
    if ( !tab.url ) {
        return;
    }
    var httpsb = HTTPSB;
    if ( httpsb.autoWhitelistTemporarilyAll(tab.url) ) {
        httpsb.smartReloadTab(tab.id);
    }
};

/******************************************************************************/

var onCommand = function(command) {
    switch ( command ) {
    case 'revert-all':
        HTTPSB.revertAllRules();
        break;
    case 'whitelist-page-domain':
        chrome.tabs.query({ active: true }, whitelistPageDomain);
        break;
    case 'whitelist-all':
        chrome.tabs.query({ active: true }, whitelistAll);
        break;
    case 'open-dashboard':
        HTTPSB.utils.gotoExtensionURL('dashboard.html');
        break;
    default:
        break;
    }
};

/******************************************************************************/

chrome.commands.onCommand.addListener(onCommand);

/******************************************************************************/

})();
