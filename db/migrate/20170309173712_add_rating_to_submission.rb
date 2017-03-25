class AddRatingToSubmission < ActiveRecord::Migration[5.0]
  def change
    add_column :submissions, :rating, :integer
  end
end
