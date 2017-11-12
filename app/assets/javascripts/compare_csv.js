$(document).ready(function () {
    var counter = 0;
    var submit_btn = $("#submit-btn");
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
    $("form").on("submit", function () {
        var inputs = $(this).serialize();
        $.ajax({
          method: "POST",
          url: "/ajax/generate-html-table",
          data: inputs,
          success: function( data ) {
            console.log(data);
          }
        });
    });
});

function displayResetBtn() {
    setTimeout(function () {
        $(".display-here").html(
            `<a href="#" class="btn btn-danger btn-block" id="reset">Reset</a>`);
        $("#submit-btn").hide();
        $("#csv-file-old").prop('disabled', true);
        $("#csv-file-new").prop('disabled', true);
        $("#select-old").prop('disabled', true);
        $("#select-new").prop('disabled', true);
    }, 2000);
    $("#reset").click(function (e) {
        e.preventDefault();
        location.reload();
    });
}
