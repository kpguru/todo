class TaskSerializer < ActiveModel::Serializer
  attributes :id, :name, :due_date, :completed, :user_id
end
