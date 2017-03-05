class Teacher < ApplicationRecord
  has_many :klasses
  has_many :assignments
  has_many :lessons
  has_many :goals
  has_many :days
end
