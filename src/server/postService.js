class PostManager {
  constructor() {
    this.postList = JSON.parse(localStorage.getItem('posts')) || 
    [
      { id: 1, 
        title: 'React 질문 title', 
        content: '리액트 질문 content', 
        author: "hee1",
        comment: [
          {
            replyId: "reply_1",
            replyAuthor: "hee2",
            replyContent: "hee2의 답변입니다."
          },
          {
            replyId: "reply_2",
            replyAuthor: "hee3",
            replyContent: "hee3의 답변입니다."
          },
        ]
      },
      { id: 2, 
        title: 'Spring 질문 title', 
        content: 'Spring 질문 content', 
        author: "hee1" ,
        comment: []
      },
      { id: 3, 
        title: 'NodeJs 질문 title', 
        content: 'NodeJs 질문 content', 
        author: "hee1" ,
        comment: []
      },
    ];
  }

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // Home에 게시물 목록 띄우기
  async getPostList() {
    // await this.sleep(1000);
    return this.postList;
  }

  // Detail에 특정게시물만 띄우기
  async getPost(id) {
    // await this.sleep(1000);
    return this.postList.find((post) => post.id === id);
  }

  // Home에 게시물 생성하기
  async createPost(title, content, author) {
    // await this.sleep(1000);
    const id = Date.now();
    const comment = [{}];
    const post = { id, title, content, author, comment};
    this.postList.push(post);
    localStorage.setItem('posts', JSON.stringify(this.postList));
    return post;
  }

  // Detail에 특정 게시물 수정하기
  async updatePost(id, title, content) {
    await this.sleep(1000);
    const post = this.postList.find((post) => post.id === id);
    post.title = title;
    post.content = content;
    localStorage.setItem('posts', JSON.stringify(this.postList));
    return post;
  }

  // Detail에 특정 게시물 삭제하기
  async deletePost(id) {
    await this.sleep(1000);
    const index = this.postList.findIndex((post) => post.id === id);
    this.postList.splice(index, 1);
    localStorage.setItem('posts', JSON.stringify(this.postList));
    return this.postList;
  }
}

export default PostManager;

// const postManager = new PostManager();

// const test = async () => {
//   const postList = await postManager.getPostList();
//   console.log(postList);

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
