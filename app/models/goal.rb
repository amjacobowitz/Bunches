class Goal < ApplicationRecord
  has_and_belongs_to_many :students
  has_one :goal_tag
end