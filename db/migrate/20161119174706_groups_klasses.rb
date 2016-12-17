class GroupsKlasses < ActiveRecord::Migration[5.0]
  def change
    create_table :groups_klasses, id: :uuid do |t|
      t.references :klass, index: true, foreign_key: true, null: false, type: :uuid
      t.references :group, index: true, foreign_key: true, null: false, type: :uuid
    end
  end
end
