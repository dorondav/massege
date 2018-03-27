var notes = [];
    var isValid = true;
    //accoure on documnet ready - only once
    $(function () {

        //when click on btnSave
        $('#btnSave').click(function () {
            isValid = true;
            //get input fields
            var date = new Date($('#date-input').val());
            var time = $('#time-input').val();
            var text = $('#text-input').val();

            //validate inputs
            validateDate(date);
            validateTime(time);
            validateText(text);

            var hours = time.split(':')[0];
            var minutes = time.split(':')[1];
            date.setHours(hours);
            date.setMinutes(minutes);

            //business validations
            dateIsGreaterThanToday(date);
            dateIsLessThat3Years(date);


            if (!isValid) {
                return false;
            }

            var dateStr = getFormatedDate(date);
            var noteElement = '<li>' +
                '<div class="notes">' +
                '<strong>' + text + '</strong>' +
                '<br>' +
                '<table style="position: absolute;bottom: 70px;left: 0;">' +
                '<tr>' +
                '<td>Date</td>' +
                '<td>' + dateStr + '</td>' +
                '</tr>' +
                '</table>' +
                '<a class="btn btn-danger delete" style="position: absolute;bottom: 1px;left: 0;width: 100% ">Delete</a>' +
                '</div>' +
                '</li>';

            $('#noteList').append(noteElement);


            var note = {
                date: date,
                text: text
            };
            //already exist list
            if (localStorage.getItem('notes')) {
                var n = JSON.parse(localStorage.getItem('notes'));
                n.push(note);
                localStorage.setItem("notes", JSON.stringify(n));
            } else {//new list
                notes.push(note);
                localStorage.setItem("notes", JSON.stringify(notes));
            }


        });

        $('body').on('click', 'a.delete', function () {
            $(this).closest('.notes').fadeOut('slow');
        });


    });


    function getFormatedDate(date) {
        var dd = date.getDate();
        var mm = date.getMonth() + 1; //January is 0!

        var yyyy = date.getFullYear();

        var hours = date.getHours();
        var minutes = date.getMinutes();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }

        if (hours < 10) {
            hours = '0' + hours;
        }
        if (minutes < 10) {
            minutes = '0' + minutes;
        }
        var formated = dd + '/' + mm + '/' + yyyy + ' ' + hours + ':' + minutes;
        return formated;
    }
    function dateIsGreaterThanToday(date) {
        if (Date.now() > date) {
            toastr.error('Date must be greater then to day');
            isValid = false;
            return false;
        }

    }

    function dateIsLessThat3Years(date) {
        var threeyeasFromNow = new Date();
        threeyeasFromNow.setFullYear(threeyeasFromNow.getFullYear() + 3);

        if (date > threeyeasFromNow) {
            isValid = false;
            toastr.error('Date must be greater that today and less then 3 years');

            return false;
        }
    }

    function validateDate(date) {
        if (!date instanceof Date) {
            isValid = false;
            toastr.error('Date field must be entered and valid');
            return false;
        }
    }

    function validateTime(time) {
        if (time == '') {
            isValid = false;
            toastr.error('Time field must be entered and valid');
            return false;
        }
    }

    function validateText(text) {
        if (text == '') {
            isValid = false;
            toastr.error('Text field must be entered.');
            return false;
        }
    }
