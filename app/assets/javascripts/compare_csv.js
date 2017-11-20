$(document).ready(function () {
    var counter = 0;
    var submit_btn = $("#submit-btn");
    var input_old = $("input[name='csv_file_old']").val();
    var input_new = $("input[name='csv_file_new']").val();
    var trigger_old_modal_btn = $("#trigger-old-modal");
    var trigger_new_modal_btn = $("#trigger-new-modal");
    submit_btn.prop('disabled', true);
    trigger_old_modal_btn.prop('disabled', true);
    trigger_new_modal_btn.prop('disabled', true);
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
                    trigger_old_modal_btn.prop('disabled', false);
                    trigger_new_modal_btn.prop('disabled', false);
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
                    trigger_old_modal_btn.prop('disabled', false);
                    trigger_new_modal_btn.prop('disabled', false);
                }
            }
        });
    });

    $("#trigger-old-modal").click(function (e) {
        e.preventDefault();
        var selected = $("#select-old").val();
        console.log(selected);
        $("#column-name-old").text(selected);
        $("input[name='old_url_to_map']").val(
            $("input[name='csv_file_old']").val());
        $("input[name='old_column_to_map']").val(selected);
    });

    $("#trigger-new-modal").click(function (e) {
        e.preventDefault();
        var selected = $("#select-new").val();
        console.log(selected);
        $("#column-name-new").text(selected);
        $("input[name='new_url_to_map']").val(
            $("input[name='csv_file_new']").val());
        $("input[name='new_column_to_map']").val(selected);
    });

    $("#choose_modal_old").click(function (e) {
        e.preventDefault();
        var address = $("input[name='map_modal_old_url']").val();
        $.ajax({
            method: "POST",
            url: "/ajax/headers_old",
            data: {csv_file_old: address},
            success: function (data) {
                $("#choose_modal_old_space").html(
                    `<select class="form-control" name="select_header_modal_old" id="select-old-modal"></select>`);
                $.each(data.headers_old, function (index, val) {
                    $("#select-old-modal").append(
                        `<option value="${val}">${val}</option>`);
                });
            }
        });
    });

    $("#choose_modal_new").click(function (e) {
        e.preventDefault();
        var address = $("input[name='map_modal_new_url']").val();
        $.ajax({
            method: "POST",
            url: "/ajax/headers_new",
            data: {csv_file_new: address},
            success: function (data) {
                $("#choose_modal_new_space").html(
                    `<select class="form-control" name="select_header_modal_new" id="select-new-modal"></select>`);
                $.each(data.headers_new, function (index, val) {
                    $("#select-new-modal").append(
                        `<option value="${val}">${val}</option>`);
                });
            }
        });
    });

//     $("#submit-btn").click(function () {
//         setTimeout(function () {
//             $(".display-here").html(
//                 `<a href="/" class="btn btn-danger btn-block" id="reset">Reset</a>`);
//             $("#submit-btn").hide();
//             $("#csv-file-old").prop('disabled', true);
//             $("#csv-file-new").prop('disabled', true);
//             $("#select-old").prop('disabled', true);
//             $("#select-new").prop('disabled', true);
//         }, 2000);
//     });
//
//     $("#reset").click(function (e) {
//         e.preventDefault();
//         location.reload();
//     });

    $(".save-btn-old").click(function (e) {
        e.preventDefault();
        var mapped_old = $("input[name='map_modal_old_url']").val();
        var selected = $("#select-old-modal").val();
        $("#map-old-modal").modal('hide');
        $("#main-form").append(
            `<input type="hidden" name="mapped_csv_file_old" value="${mapped_old}">`);
        $("#main-form").append(
            `<input type="hidden" name="mapped_selected_field_old" value="${selected}">`);
        $("#map-old").html(`<h3 class="text-danger">Mapped</h3>`);
    });

    $(".save-btn-new").click(function (e) {
        e.preventDefault();
        var mapped_new = $("input[name='map_modal_new_url']").val();
        var selected = $("#select-new-modal").val();
        $("#map-new-modal").modal('hide');
        $("#main-form").append(
            `<input type="hidden" name="mapped_csv_file_new" value="${mapped_new}">`);
        $("#main-form").append(
            `<input type="hidden" name="mapped_selected_field_new" value="${selected}">`);
        $("#map-new").html(`<h3 class="text-danger">Mapped</h3>`)
    });
});
