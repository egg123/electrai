"use strict";

const {app, Tray, BrowserWindow, Menu} = require('electron');

let mainWindow = null;


var menu = Menu.buildFromTemplate([
  {
    label: 'File',
    submenu: [
      {label: 'New File', click: onNewFile},
      {type: 'separator'},
      {label: 'Save'},
      {label: 'Save As...', click: onSaveAs},
      {type: 'separator'},
      {label: 'Export As MNIST', click: onMnist},
      {type: 'separator'},
      {label: 'Exit', click: onExit}
    ]
  },
  {
    label: 'Edit',
    submenu: [
      {label: 'Copy', accelerator: 'CmdOrCtrl+C'},
      {label: 'Paste', accelerator: 'CmdOrCtrl+V'},
    ]
  },
  {
    label: 'Help',
    submenu: [
      {label: 'About'}
    ]
  },
]);

Menu.setApplicationMenu(menu);


app.on('window-all-closed', () => {
    onExit();
});

app.on('activate', (event, hasVisibleWindows) => {
    if (mainWindow === null) {
        createWindow();
    }
});

app.on('ready', () => {
	createWindow();
});


function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1280,
        height: 960,
        frame: true,
        title: 'electrai',
        webPreferences: {
			nodeIntegration: true,
        }
    });

    mainWindow.loadURL(`file://${__dirname}/../../html/index_javascript.html`);
    mainWindow.webContents.openDevTools();
	mainWindow.setAutoHideMenuBar(false);

    mainWindow.on('closed', function () {
        mainWindow = null;
    });

    mainWindow.on('page-title-updated', (event, title) => {
    	event.preventDefault();
    });


    let contents = mainWindow.webContents;

    contents.on('dom-ready', handleDomReady);
	//'dom-ready'
	function handleDomReady(event) {
		console.log('dom-ready');
	}

}

function onExit() {
	app.quit();
}

function onSaveAs() {
	Function.prototype.toString2 = function() {
		return "(" + this.toString() + ")();";
	};
	mainWindow.webContents.executeJavaScript(
		(function(filename){
			console.log('Save As...');

			var dataUrl = document.getElementById('canvas').toDataURL('data:image/png');
			var a = document.createElement("a");

			a.style = "display: none";
			a.title = "SaveAs";
			a.href = dataUrl;
			a.target = '_blank';
			a.download = filename;

			document.body.appendChild(a);
			a.click();

			setTimeout( () => {
				document.body.removeChild(a);
				window.URL.revokeObjectURL(dataUrl);
			}, 100);


		}).toString2()
	);
}

function onNewFile() {
	console.log('New File');

	Function.prototype.toString2 = function() {
		return "(" + this.toString() + ")();";
	};

	mainWindow.webContents.executeJavaScript(
		(function(){
			console.log('New File');
			//
			newCanvas();

		}).toString2()
	);
}

function onMnist() {
	console.log('Export As MNIST');

	Function.prototype.toString2 = function() {
		return "(" + this.toString() + ")();";
	};

	mainWindow.webContents.executeJavaScript(
		(function(){
			console.log('New File');
			//
			var dataUrl = document.getElementById('canvas').toDataURL('data:image/png');



		}).toString2()
	);
}