class Student < ApplicationRecord
  has_and_belongs_to_many :klasses
  belongs_to :group
  has_and_belongs_to_many :goals
end
