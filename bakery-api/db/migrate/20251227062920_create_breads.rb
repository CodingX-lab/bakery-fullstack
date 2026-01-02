class CreateBreads < ActiveRecord::Migration[7.1]
  def change
    create_table :breads do |t|
      t.string :name
      t.decimal :price
      t.string :img
      t.references :category

      t.timestamps
    end
  end
end
