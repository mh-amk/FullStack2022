const lodash = require('lodash')

const dummy = (blogs) => {return 1}

const  totalLikes = (blogs) => {
  const reducer = (sum, item) => sum + item.likes
  return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) =>
{
  const bigger = (big,item) => big.likes > item.likes ? big : item
  return blogs.length === 0 ? null :blogs.reduce(bigger,0)
}

const mostBlogs = (blogs) =>
{
  let authorBlogs = lodash.map( lodash.countBy(blogs,'author'),
    (value,key) => ({ author:key , blogs:value }))
  let result = lodash.maxBy(authorBlogs,'blogs')
  return result
}

const mostLikes = (blogs) =>
{
  let AuthorLikes = lodash.map(blogs, (value) => ({ author:value.author , likes:value.likes }))
  let maxLikes = lodash.maxBy(lodash.map(lodash.groupBy(AuthorLikes,'author'),
    (value,key) => ({ author:key , likes:lodash.sumBy(value,'likes') })),'likes')
  return maxLikes
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}