# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

101.times do |i|
    User.create!({username: "username#{i}", password: '123456', email: "username#{i}@mailinator.com"})
end

101.times do |i|
    Item.create({title: "Item #{i}", description: "Description #{i}", user_id: User.last.id})
end

101.times do |i|
    Comment.create({body: "Comment body", user_id: User.last.id, item_id: Item.last.id})
end



