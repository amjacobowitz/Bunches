class CreateGroups < ActiveRecord::Migration[5.0]
  def change
    create_table :groups, id: :uuid do |t|
      t.string :name, null: false

      t.timestamps null: false
    end
  end
end
