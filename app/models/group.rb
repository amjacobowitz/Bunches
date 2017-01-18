class Group < ApplicationRecord
  has_many :klasses
  has_many :students
  has_many :assignments
end
