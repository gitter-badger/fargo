
angular.module('fargo')

  .config(function(datepickerPopupConfig) {
    datepickerPopupConfig.datepickerPopup = 'dd/MM/yyyy';
    datepickerPopupConfig.closeText = 'Close';
    datepickerPopupConfig.showButtonBar = false;
  });
