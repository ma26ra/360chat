/*!
 * 360chat
 * version 1.0
 *
 * Modules in this bundle
 * @license
 *  three.js:
 *  Copyright © 2010-2016 three.js authors
 *  Released under the MIT license
 *  https://github.com/mrdoob/three.js/blob/master/LICENSE
 *
 *  peerjs:
 *  Copyright (c) 2015 Michelle Bu and Eric Zhang
 *  http://peerjs.com
 *  2013-2017 NTT Communications Corporation, http://www.ntt.com
 *
 */
var electron = require('electron');
var app = electron.app;
var BrowserWindow = electron.BrowserWindow;

var mainWindow;

app.on('window-all-closed', function() {
  if (process.platform != 'darwin') app.quit();
});

app.on('ready', function() {
  mainWindow = new BrowserWindow({  width: 960,  height: 640 });
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  mainWindow.webContents.openDevTools();

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});
