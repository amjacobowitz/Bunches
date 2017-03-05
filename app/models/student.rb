class Student < ApplicationRecord
  has_many :submissions
  belongs_to :group
  belongs_to :klass
  belongs_to :goal
end
