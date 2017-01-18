class CreateSubmissions < ActiveRecord::Migration[5.0]
  def change
    create_table :submissions, id: :uuid do |t|
      t.string :review
      t.integer :score
      t.attachment :answer
      t.references :assignment, index: true, foreign_key: true, type: :uuid
      t.references :student, index: true, foreign_key: true, type: :uuid

      t.timestamps
    end
  end
end
