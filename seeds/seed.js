const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json'); 
const commentData = require('./commentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  
  const posts = await Promise.all(postData.map(async (post) => {
    const user = users.find((user) => user.id === post.user_id);
    if (user) {
      return await Post.create;
    } else {
      console.log(`User not found for post with user_id: ${post.user_id}`);
    }
  }));
  
  const comments = await Promise.all(commentData.map(async (comment) => {
    const user = users.find((user) => user.id === comment.user_id);
    const post = posts.find((post) => post.id === comment.post_id);
    if (user && post) {
      return await Comment.create;
    }
  }));

  process.exit(0);
 
};

seedDatabase();

