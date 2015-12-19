class CreateTasks < ActiveRecord::Migration
  def change
    create_table :tasks do |t|
      t.string :name, null: false
      t.date :due_date
      t.boolean :completed, null: false, default: false
      t.references :user

      t.timestamps
    end
  end
end
