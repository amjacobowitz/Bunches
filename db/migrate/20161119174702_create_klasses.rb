class CreateKlasses < ActiveRecord::Migration[5.0]
  def change
    create_table :klasses, id: :uuid do |t|
      t.string :name, null: false
      t.string :pin, null: false

      t.timestamps null: false
    end
  end
end
