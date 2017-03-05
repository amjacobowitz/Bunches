class CreateDays < ActiveRecord::Migration[5.0]
  def change
    create_table :days, id: :uuid do |t|
      t.date :date
      t.references :teacher, index: true, foreign_key: true, type: :uuid

      t.timestamps
    end
  end
end
