class Teacher < ApplicationRecord
  has_many :klasses
  has_many :assignments
  has_many :lessons
end
