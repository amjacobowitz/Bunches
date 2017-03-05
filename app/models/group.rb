class Group < ApplicationRecord
  has_many :klasses
  has_many :students
  belongs_to :assignment
  belongs_to :goal
end
