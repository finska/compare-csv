$(document).ready(function () {
    var counter = 0;
    var submit_btn = $("#submit-btn");
    var input_old = $("input[name='csv_file_old']").val();
    var input_new = $("input[name='csv_file_new']").val();
    submit_btn.prop('disabled', true);
    $("#choose_parameter_old").click(function (e) {
        e.preventDefault();
        var address = $("input[name='csv_file_old']").val();
        $.ajax({
            method: "POST",
            url: "/ajax/headers_old",
            data: {csv_file_old: address},
            success: function (data) {
                $("#div-choose-old").html(
                    `<select class="form-control" name="select_header_old" id="select-old"></select>`);
                $.each(data.headers_old, function (index, val) {
                    $("#select-old").append(
                        `<option value="${val}">${val}</option>`);
                });
                counter++;
                if (counter == 2) {
                    submit_btn.prop('disabled', false);
                }
            }
        });
    });
    $("#choose_parameter_new").click(function (e) {
        e.preventDefault();
        var address = $("input[name='csv_file_new']").val();
        $.ajax({
            method: "POST",
            url: "/ajax/headers_new",
            data: {csv_file_new: address},
            success: function (data) {
                $("#div-choose-new").html(
                    `<select class="form-control" name="select_header_new" id="select-new"></select>`);
                $.each(data.headers_new, function (index, val) {
                    $("#select-new").append(
                        `<option value="${val}">${val}</option>`);
                });
                counter++;
                if (counter == 2) {
                    submit_btn.prop('disabled', false);
                }
            }
        });
    });

    $("#submit-btn").click(function () {
        setTimeout(function () {
            $("#div-choose-old").html(
                `<a href="#" class="btn btn-danger btn-block" id="choose_parameter_old" name="choose_parameter_old">Choose columns to compare</a>`);
            $("#div-choose-new").html(
                `<a href="#" class="btn btn-danger btn-block" id="choose_parameter_new" name="choose_parameter_new">Choose columns to compare</a>`);
            $("#csv-file-old").prop('disabled', false);
            $("#csv-file-new").prop('disabled', false);
        }, 2000);
    });
});
