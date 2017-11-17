require 'test_helper'

class AjaxRequestsControllerTest < ActionDispatch::IntegrationTest
  test "should get headers_old" do
    get ajax_requests_headers_old_url
    assert_response :success
  end

  test "should get headers_new" do
    get ajax_requests_headers_new_url
    assert_response :success
  end

end
