const {remote} = require('electron');
const {BrowserWindow, dialog, shell} = remote;
const fs = require('fs');

let print_win;
let save_pdf_path;

function getPDFPrintSettings() {
  var option = {
    landscape: false,
    marginsType: 0,
    printBackground: false,
    printSelectionOnly: false,
    pageSize: 'A4',
  };
return option;
}

function print() {
  if (print_win)
    print_win.webContents.print();
}

function savePDF() {
  if (!print_win) {
    dialog.showErrorBox('Error', "The printing window isn't created");
    return;
  }
  dialog.showSaveDialog(print_win, {}, function(file_path) {
    if (file_path) {
      print_win.webContents.printToPDF(getPDFPrintSettings(), function(err, data) {
        if (err) {
          dialog.showErrorBox('Error', err);
          return;
        }
        fs.writeFile(file_path, data, function(err) {
          if (err) {
            dialog.showErrorBox('Error', err);
            return;
          }
          save_pdf_path = file_path;

        });
      });
    }
  });
}

function viewPDF() {
  if (!save_pdf_path) {
    dialog.showErrorBox('Error', "You should save the pdf before viewing it");
    return;
  }
  shell.openItem(save_pdf_path);
}

document.getElementById('pdfpage').addEventListener('click', function() {
  print_win = new BrowserWindow({'auto-hide-menu-bar':true});
  print_win.loadURL('file://' + __dirname + '/print.html');
  print_win.show();

  print_win.webContents.on('did-finish-load', function() {
    document.getElementById('print_button').addEventListener('click', print);
    document.getElementById('save_pdf_button').addEventListener(
      'click', savePDF);
    document.getElementById('view_pdf_button').addEventListener(
      'click', viewPDF);
  });
  print_win.on('closed', function() {
    print_win = null;
  });
});
