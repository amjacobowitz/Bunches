class CreateLessons < ActiveRecord::Migration[5.0]
  def change
    create_table :lessons, id: :uuid do |t|
      t.string :title
      t.references :teacher, index: true, foreign_key: true, type: :uuid

      t.timestamps
    end
  end
end
