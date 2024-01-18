const { v4: uuidv4 } = require('uuid');

class PostManager {
  constructor() {
    this.posts = JSON.parse(localStorage.getItem('posts')) || [
      {
        id: 1,
        title: '리액트 관련 질문있습니다!',
        content: '리액트 질문내용',
        author: 'hee1',
      },
      {
        id: 2,
        title: '스프링 관련 질문있습니다!',
        content: '스프링 질문내용',
        author: 'hee1',
      },
      {
        id: 3,
        title: 'nodejs 관련 질문있습니다!',
        content: 'nodejs 질문내용',
        author: 'hee1',
      },
      {
        id: 4,
        title: 'css 관련 질문있습니다!',
        content: 'css 질문내용',
        author: 'hee1',
      },
    ];
  }

  sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  async getPostList() {
    await this.sleep(1000);
    return this.posts;
  }

  async getPost(id) {
    await this.sleep(1000);
    return this.posts.find((post) => post.id === id);
  }

  async createPost(title, content) {
    await this.sleep(1000);
    const uniqueId = uuidv4();
    const id = uniqueId;
    const post = { id, title, content };
    this.posts.push(post);
    return post;
  }

  async updatePost(id, title, content) {
    await this.sleep(1000);
    const post = this.posts.find((post) => post.id === id);
    post.title = title;
    post.content = content;
    return post;
  }

  async deletePost(id) {
    await this.sleep(1000);
    const index = this.posts.findIndex((post) => post.id === id);
    this.posts.splice(index, 1);
    return this.posts;
  }
}

export default PostManager;

// const postManager = new PostManager();

// const test = async () => {
//   const posts = await postManager.getPostList();
//   console.log(posts);

//   const post = await postManager.getPost(1);
//   console.log(post);

//   const createdPost = await postManager.createPost('title4', 'content4');
//   console.log(createdPost);

//   const updatedPost = await postManager.updatePost(1, 'title1-1', 'content1-1');
//   console.log(updatedPost);

//   const deletedPostId = await postManager.deletePost(1);
//   console.log(deletedPostId);
// };
// test();
