class CreateGroupings < ActiveRecord::Migration[5.0]
  def change
    create_table :groupings, id: :uuid do |t|
      t.string :title, null: false
      t.references :klass, index: true, foreign_key: true, type: :uuid
      t.belongs_to :lesson, index: true, foreign_key: true, type: :uuid

      t.timestamps
    end
  end
end
