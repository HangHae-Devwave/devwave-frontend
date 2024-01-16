class PostManager {
  constructor() {
    this.postList = JSON.parse(localStorage.getItem('posts')) || [
      { id: 1, title: 'title1', content: 'content1' },
      { id: 2, title: 'title2', content: 'content2' },
      { id: 3, title: 'title3', content: 'content3' },
    ];
  }

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async getPostList() {
    await this.sleep(1000);
    return this.postList;
  }

  async getPost(id) {
    await this.sleep(1000);
    return this.postList.find((post) => post.id === id);
  }

  async createPost(title, content) {
    await this.sleep(1000);
    const id = Date.now();
    const post = { id, title, content };
    this.postList.push(post);
    localStorage.setItem('posts', JSON.stringify(this.postList));
    return post;
  }

  async updatePost(id, title, content) {
    await this.sleep(1000);
    const post = this.postList.find((post) => post.id === id);
    post.title = title;
    post.content = content;
    localStorage.setItem('posts', JSON.stringify(this.postList));
    return post;
  }

  async deletePost(id) {
    await this.sleep(1000);
    const index = this.postList.findIndex((post) => post.id === id);
    this.postList.splice(index, 1);
    localStorage.setItem('posts', JSON.stringify(this.postList));
    return this.postList;
  }
}

// export default PostManager;

const postManager = new PostManager();

const test = async () => {
  const postList = await postManager.getPostList();
  console.log(postList);

  const post = await postManager.getPost(1);
  console.log(post);

  const createdPost = await postManager.createPost('title4', 'content4');
  console.log(createdPost);

  const updatedPost = await postManager.updatePost(1, 'title1-1', 'content1-1');
  console.log(updatedPost);

  const deletedPostId = await postManager.deletePost(1);
  console.log(deletedPostId);
};
test();
