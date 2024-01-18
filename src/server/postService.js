const { v4: uuidv4 } = require('uuid');

class PostManager {
  constructor() {
    this.posts = [
      {
        id: 1,
        type: 'question',
        title: '리액트 관련 질문있습니다!',
        content: '리액트 질문내용',
        author: '곽민지',
        date: this.dateFormat(new Date()),
      },
      {
        id: 2,
        type: 'board',
        title: 'React Query에 대해',
        content: `리액트 쿼리는 리액트 애플리케이션에서 상태 관리와 데이터 획득을 효율적으로 처리하기 위한 라이브러리입니다. 이를 통해 컴포넌트 간의 상태 공유와 비동기 데이터 요청이 더욱 간편해집니다.

        useQuery(): 비동기 데이터를 요청할 때 사용되는 훅입니다. 쿼리 훅을 사용하면 데이터 로딩, 성공, 실패 시의 다양한 상태를 간단하게 다룰 수 있습니다.
        
        Copy code
        const { data, loading, error } = useQuery('쿼리키', fetchDataFunction);
        useMutation(): 데이터를 변경하거나 업데이트할 때 사용됩니다. 비동기 작업 완료 후의 상태나 에러 처리 등을 효과적으로 다룰 수 있습니다.
        
        Copy code
        const mutation = useMutation(updateDataFunction);
        useQueryClient(): 쿼리 클라이언트 객체를 반환하며, 이를 통해 동적으로 쿼리를 만들거나 캐시에 직접 접근할 수 있습니다.
        
        Copy code
        const queryClient = useQueryClient();
        React Query Devtools: 브라우저 개발자 도구에 통합된 리액트 쿼리 디버깅 도구를 제공하여, 애플리케이션의 상태를 쉽게 모니터링할 수 있습니다.
        리액트 쿼리는 간결하면서도 강력한 기능을 제공하여, 복잡한 상태 관리 및 비동기 데이터 요청을 보다 쉽게 다룰 수 있도록 도와줍니다.`,
        author: '곽민지',
        date: this.dateFormat(new Date()),
      },
      {
        id: 3,
        type: 'question',
        title: 'nodejs 관련 질문있습니다!',
        content: 'nodejs 질문내용',
        author: 'hee1',
        date: this.dateFormat(new Date()),
      },
      {
        id: 4,
        type: 'question',
        title: 'css 관련 질문있습니다!',
        content: 'css 질문내용',
        author: 'hee1',
        date: this.dateFormat(new Date()),
      },
      {
        id: 5,
        type: 'question',
        title: '스프링 관련 질문있습니다!',
        content: '스프링 질문내용',
        author: '임희원',
        date: this.dateFormat(new Date()),
      },
    ];
  }

  sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  dateFormat = (date) => {
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();

    month = month >= 10 ? month : '0' + month;
    day = day >= 10 ? day : '0' + day;
    hour = hour >= 10 ? hour : '0' + hour;
    minute = minute >= 10 ? minute : '0' + minute;

    return date.getFullYear() + '-' + month + '-' + day + ' ' + hour + ':' + minute;
  };

  async getPostList() {
    await this.sleep(1000);
    return this.posts;
  }

  async getPost(id) {
    await this.sleep(1000);
    return this.posts.find((post) => post.id === id);
  }

  async createPost(type, title, content, author) {
    await this.sleep(1000);
    const uniqueId = uuidv4();
    const id = uniqueId;
    const date = this.dateFormat(new Date());
    const post = { type, id, title, content, author, date };
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
