$(function () {
    /* Date UI design Start */
    function checkFirstOrLastDayMonth(dateVale, currentDay) {
        let selectedClass = "";
        if (currentDay == 1) {
            selectedClass = " ui-state-start-day";
        } else {
            const testDate = new Date(dateVale.getTime() + 86400000);
            if (testDate.getDate() === 1) {
                selectedClass = " ui-state-end-day";
            }
        }
        return selectedClass;
    }

    function addDatePickerBgColor(targetTd, isStartDateUI, isEleFound = false) {
        let isFound = isEleFound;
        targetTd.each(function (indx, tdElement) {
            const $tdElement = $(tdElement);
            if ($tdElement.hasClass("ui-datepicker-current-day")) {
                isFound = !isFound;
                if (!isStartDateUI) {
                    $tdElement.addClass("ui-datepicker-bg-color");
                }
            }
            if (isFound == isStartDateUI) {
                $tdElement.addClass("ui-datepicker-bg-color");
            }
        });
    }

    function styleDatePickerUI(inst, isStartDateUI = true) {
        const dateValue = isStartDateUI ? inst.settings.maxDate : inst.settings.minDate;
        const day = dateValue.getDate();
        const month = dateValue.getMonth();
        const year = dateValue.getFullYear();
        let selectedClass = isStartDateUI ? "ui-state-start-active" : "ui-state-end-active";
        let isFound;

        setTimeout(function () {
            const targetTd = inst.dpDiv.find('.ui-datepicker-calendar tbody td[data-handler="selectDay"]');
            const selectedDayTd = inst.dpDiv.find(".ui-datepicker-calendar tbody .ui-datepicker-current-day");
            // check first day or last day of month
            selectedClass += checkFirstOrLastDayMonth(new Date(inst.input.val()), inst.currentDay);
            selectedDayTd.find(".ui-state-default").addClass(selectedClass);

            if (inst.drawYear == year) {
                if (inst.drawMonth == month) {
                    if (isStartDateUI) {
                        selectedClass = "ui-state-active ui-state-end-active" + checkFirstOrLastDayMonth(dateValue, day);
                        targetTd.last().children().addClass(selectedClass);
                        isFound = inst.drawMonth != inst.currentMonth;
                        addDatePickerBgColor(targetTd, isStartDateUI, isFound);
                    } else {
                        selectedClass = "ui-state-active ui-state-start-active" + checkFirstOrLastDayMonth(dateValue, day);
                        targetTd.first().children().addClass(selectedClass);
                        isFound = false;
                        addDatePickerBgColor(targetTd, isStartDateUI, isFound);
                    }
                } else {
                    if (isStartDateUI) {
                        isFound = (inst.drawYear > inst.currentYear) ||
                            (inst.drawYear == inst.currentYear && inst.drawMonth > inst.currentMonth);
                        addDatePickerBgColor(targetTd, isStartDateUI, isFound);
                    } else {
                        if ((inst.drawYear < inst.currentYear) || (inst.drawYear == inst.currentYear &&
                            inst.drawMonth <= inst.currentMonth)) {
                            isFound = false;
                            addDatePickerBgColor(targetTd, isStartDateUI, isFound);
                        }
                    }
                }
            } else {
                if (isStartDateUI) {
                    isFound = (inst.drawYear > inst.currentYear) ||
                        (inst.drawYear == inst.currentYear && inst.drawMonth > inst.currentMonth);
                    addDatePickerBgColor(targetTd, isStartDateUI, isFound);
                } else {
                    if ((inst.drawYear < inst.currentYear) || (inst.drawYear == inst.currentYear &&
                        inst.drawMonth <= inst.currentMonth)) {
                        isFound = false;
                        addDatePickerBgColor(targetTd, isStartDateUI, isFound);
                    }
                }
            }
        }, 10);
    }

    const calendarBtnIcon = `
    <svg class="input-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 110.01 122.88" xml:space="preserve">
        <style type="text/css">
            .st0 {
                fill-rule: evenodd;
                clip-rule: evenodd;
            }
        </style>
        <g>
            <path class="st0"
                d="M1.87,14.69h22.66L24.5,14.3V4.13C24.5,1.86,26.86,0,29.76,0c2.89,0,5.26,1.87,5.26,4.13V14.3l-0.03,0.39 h38.59l-0.03-0.39V4.13C73.55,1.86,75.91,0,78.8,0c2.89,0,5.26,1.87,5.26,4.13V14.3l-0.03,0.39h24.11c1.03,0,1.87,0.84,1.87,1.87 v19.46c0,1.03-0.84,1.87-1.87,1.87H1.87C0.84,37.88,0,37.04,0,36.01V16.55C0,15.52,0.84,14.69,1.87,14.69L1.87,14.69z M0.47,42.19 h109.08c0.26,0,0.46,0.21,0.46,0.46l0,0v79.76c0,0.25-0.21,0.46-0.46,0.46l-109.08,0c-0.25,0-0.47-0.21-0.47-0.46V42.66 C0,42.4,0.21,42.19,0.47,42.19L0.47,42.19L0.47,42.19z M97.27,52.76H83.57c-0.83,0-1.5,0.63-1.5,1.4V66.9c0,0.77,0.67,1.4,1.5,1.4 h13.71c0.83,0,1.51-0.63,1.51-1.4V54.16C98.78,53.39,98.1,52.76,97.27,52.76L97.27,52.76z M12.24,74.93h13.7 c0.83,0,1.51,0.63,1.51,1.4v12.74c0,0.77-0.68,1.4-1.51,1.4H12.71c-0.83,0-1.5-0.63-1.5-1.4V75.87c0-0.77,0.68-1.4,1.5-1.4 L12.24,74.93L12.24,74.93z M12.24,97.11h13.7c0.83,0,1.51,0.63,1.51,1.4v12.74c0,0.77-0.68,1.4-1.51,1.4l-13.24,0 c-0.83,0-1.5-0.63-1.5-1.4V98.51c0-0.77,0.68-1.4,1.5-1.4L12.24,97.11L12.24,97.11z M12.24,52.76h13.7c0.83,0,1.51,0.63,1.51,1.4 V66.9c0,0.77-0.68,1.4-1.51,1.4l-13.24,0c-0.83,0-1.5-0.63-1.5-1.4V54.16c0-0.77,0.68-1.4,1.5-1.4L12.24,52.76L12.24,52.76z M36.02,52.76h13.71c0.83,0,1.5,0.63,1.5,1.4V66.9c0,0.77-0.68,1.4-1.5,1.4l-13.71,0c-0.83,0-1.51-0.63-1.51-1.4V54.16 C34.51,53.39,35.19,52.76,36.02,52.76L36.02,52.76L36.02,52.76z M36.02,74.93h13.71c0.83,0,1.5,0.63,1.5,1.4v12.74 c0,0.77-0.68,1.4-1.5,1.4H36.02c-0.83,0-1.51-0.63-1.51-1.4V75.87c0-0.77,0.68-1.4,1.51-1.4V74.93L36.02,74.93z M36.02,97.11h13.71 c0.83,0,1.5,0.63,1.5,1.4v12.74c0,0.77-0.68,1.4-1.5,1.4l-13.71,0c-0.83,0-1.51-0.63-1.51-1.4V98.51 C34.51,97.74,35.19,97.11,36.02,97.11L36.02,97.11L36.02,97.11z M59.79,52.76H73.5c0.83,0,1.51,0.63,1.51,1.4V66.9 c0,0.77-0.68,1.4-1.51,1.4l-13.71,0c-0.83,0-1.51-0.63-1.51-1.4V54.16C58.29,53.39,58.96,52.76,59.79,52.76L59.79,52.76 L59.79,52.76z M59.79,74.93H73.5c0.83,0,1.51,0.63,1.51,1.4v12.74c0,0.77-0.68,1.4-1.51,1.4H59.79c-0.83,0-1.51-0.63-1.51-1.4 V75.87c0-0.77,0.68-1.4,1.51-1.4V74.93L59.79,74.93z M97.27,74.93H83.57c-0.83,0-1.5,0.63-1.5,1.4v12.74c0,0.77,0.67,1.4,1.5,1.4 h13.71c0.83,0,1.51-0.63,1.51-1.4l0-13.21c0-0.77-0.68-1.4-1.51-1.4L97.27,74.93L97.27,74.93z M97.27,97.11H83.57 c-0.83,0-1.5,0.63-1.5,1.4v12.74c0,0.77,0.67,1.4,1.5,1.4h13.71c0.83,0,1.51-0.63,1.51-1.4l0-13.21c0-0.77-0.68-1.4-1.51-1.4 L97.27,97.11L97.27,97.11z M59.79,97.11H73.5c0.83,0,1.51,0.63,1.51,1.4v12.74c0,0.77-0.68,1.4-1.51,1.4l-13.71,0 c-0.83,0-1.51-0.63-1.51-1.4V98.51C58.29,97.74,58.96,97.11,59.79,97.11L59.79,97.11L59.79,97.11z M7.01,47.71h96.92 c0.52,0,0.94,0.44,0.94,0.94v67.77c0,0.5-0.44,0.94-0.94,0.94H6.08c-0.5,0-0.94-0.42-0.94-0.94V49.58 C5.14,48.55,5.98,47.71,7.01,47.71L7.01,47.71L7.01,47.71z M78.8,29.4c2.89,0,5.26-1.87,5.26-4.13V15.11l-0.03-0.41H73.58 l-0.03,0.41v10.16C73.55,27.54,75.91,29.4,78.8,29.4L78.8,29.4L78.8,29.4z M29.76,29.4c2.89,0,5.26-1.87,5.26-4.13V15.11 l-0.03-0.41H24.53l-0.03,0.41v10.16C24.5,27.54,26.86,29.4,29.76,29.4L29.76,29.4z" />
        </g>
    </svg>`;

    $("#startDate").datepicker({
        defaultDate: '',
        gotoCurrent: true,
        dateFormat: "yy-mm-dd",
        changeMonth: true,
        changeYear: true,
        dayNamesMin: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
        showOn: "both",
        buttonText: calendarBtnIcon,
        beforeShow: function (input, inst) {
            inst.dpDiv.addClass("survey-portal-date-picker-ui");
            setTimeout(function () {
                const dateInputWidth = inst.input.parent().width();
                inst.dpDiv.outerWidth(dateInputWidth);
            }, 0);
            const today = new Date();
            if (inst.input.val() == "") {
                inst.settings.minDate = today;
            } else {
                const minDate = new Date(inst.input.val());
                inst.settings.minDate = minDate < today ? minDate : today;
            }
            inst.dpDiv.removeClass("date-picker-color-ui");
            if ($("#endDate").val()) {
                const maxDate = new Date($("#endDate").val());
                inst.settings.maxDate = maxDate;
                // color pattern
                if (inst.input.val()) {
                    inst.dpDiv.addClass("date-picker-color-ui");
                    styleDatePickerUI(inst, true);
                }
            }
        },
        onChangeMonthYear: function (year, month, inst) {
            setTimeout(function () {
                const dateInputWidth = inst.input.parent().width();
                inst.dpDiv.outerWidth(dateInputWidth);
            }, 0);
            if ($("#endDate").val() && inst.input.val()) {
                styleDatePickerUI(inst, true);
            }
        }
    });

    $("#endDate").datepicker({
        defaultDate: '',
        gotoCurrent: true,
        dateFormat: "yy-mm-dd",
        changeMonth: true,
        changeYear: true,
        dayNamesMin: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
        showOn: "both",
        buttonText: calendarBtnIcon,
        beforeShow: function (input, inst) {
            inst.dpDiv.addClass("survey-portal-date-picker-ui");
            setTimeout(function () {
                const dateInputWidth = inst.input.parent().width();
                inst.dpDiv.outerWidth(dateInputWidth);
            }, 0);
            const today = new Date();
            inst.dpDiv.removeClass("date-picker-color-ui");
            if ($("#startDate").val()) {
                const minDate = new Date($("#startDate").val());
                inst.settings.minDate = minDate;
                // color pattern
                if (inst.input.val()) {
                    inst.dpDiv.addClass("date-picker-color-ui");
                    styleDatePickerUI(inst, false);
                }
            }
            else if (inst.input.val() == "") {
                inst.settings.minDate = today;
            } else {
                const minDate = new Date(inst.input.val());
                inst.settings.minDate = minDate < today ? minDate : today;
            }
        },
        onChangeMonthYear: function (year, month, inst) {
            setTimeout(function () {
                const dateInputWidth = inst.input.parent().width();
                inst.dpDiv.outerWidth(dateInputWidth);
            }, 0);
            if ($("#startDate").val() && inst.input.val()) {
                styleDatePickerUI(inst, false);
            }
        }
    });
    /* Date UI design End */
});