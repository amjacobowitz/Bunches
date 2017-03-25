class Group < ApplicationRecord
  has_many :klasses
  belongs_to :assignment
  belongs_to :goal
  has_and_belongs_to_many :students
end
