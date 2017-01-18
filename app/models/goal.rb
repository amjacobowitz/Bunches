class Goal < ApplicationRecord
  has_one :goal_tag
  belongs_to :student
end
