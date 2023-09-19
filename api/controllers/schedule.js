// const { updatePostsAndSendEmails } = require('./posts');
// const Post = require('../models/post');

// const checkAndUpdatePosts = async () => {
//   try {
//     const posts = await Post.find();
//     await updatePostsAndSendEmails(posts);
//     console.log("Checked and updated posts.");
//   } catch (err) {
//     console.error('Error while updating posts:', err);
//   }
// };

// // Run checkAndUpdatePosts every 5 minutes (300000 milliseconds)
// setInterval(checkAndUpdatePosts, 300000);

// // You can also run it once when the server starts
// checkAndUpdatePosts();
