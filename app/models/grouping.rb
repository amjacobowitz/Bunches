class Grouping < ApplicationRecord
  has_many :groups
  has_and_belongs_to_many :lessons
  belongs_to :klass

  before_destroy do |record|
    groups = record.groups
    groups.each do |group|
      group.students.each do |student|
        student.update(group_id: '')
      end
      group.destroy
    end
  end
end
