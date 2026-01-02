# db/seeds.rb

puts '正在清理旧数据...'
# 注意：如果设置了关联，最好先删 Bread 再删 Category
Bread.destroy_all
Category.destroy_all

puts '正在注入面包分类...'
# 我们把创建的对象存进变量，方便后面引用
euro_style = Category.create!(name: '欧式')
toast      = Category.create!(name: '吐司')
others     = Category.create!(name: '其他')

puts '正在注入新鲜面包...'
# 方式 A：在创建面包时直接传入对应的 category 对象
Bread.create!([
                {
                  name: '法棍',
                  price: 25,
                  category: euro_style, # 👈 直接传对象，Rails 会自动处理 ID
                  img: 'https://images.unsplash.com/photo-1719851615094-272d2251e20d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDZ8fHxlbnwwfHx8fHw%3D'
                },
                {
                  name: '黄金牛角包',
                  price: 18,
                  category: others,
                  img: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400'
                },
                {
                  name: '全麦吐司',
                  price: 22,
                  category: toast,
                  img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400'
                }
              ])

puts "注入完成！当前共有 #{Category.count} 个分类和 #{Bread.count} 种面包。"
