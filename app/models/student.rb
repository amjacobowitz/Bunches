class Student < ApplicationRecord
  has_many :submissions
  belongs_to :klass
  belongs_to :goal
  has_and_belongs_to_many :groups
end
