class AddDayToSubmission < ActiveRecord::Migration[5.0]
  def change
    add_reference :submissions, :day, type: :uuid, foreign_key: :true, index: true
  end
end
