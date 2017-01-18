class Grouping < ApplicationRecord
  has_many :groups
  belongs_to :klass
end
