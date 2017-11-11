require 'test_helper'

class CompareCsvControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get compare_csv_index_url
    assert_response :success
  end

end
