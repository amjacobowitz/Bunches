class Student < ApplicationRecord
  has_many :goals
  has_many :assignments
  has_many :submissions
  belongs_to :group
  belongs_to :klass
end
