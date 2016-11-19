class GroupsKlasses < ActiveRecord::Migration[5.0]
  def change
    create_table :groups_klasses, id: :uuid do |t|
      t.uuid :klass_id, index: true
      t.uuid :group_id, index: true
    end
  end
end
