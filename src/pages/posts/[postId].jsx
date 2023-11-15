import { useState, useEffect } from "react";

export const getStaticPaths = async () => {
   const res = await fetch("https://jsonplaceholder.typicode.com/posts");
   const data = await res.json(); 

   const paths = data.map((post) =>{
     return {
        params: {postId: post.id.toString()}
     }
   })

   return {
     paths,
     fallback: false
   }
}

export const getStaticProps = async (context) => {
    const id = context.params.postId;
    const idRes = await fetch("https://jsonplaceholder.typicode.com/posts/" + id)
    const idData = await idRes.json();

    const commentsRes = await fetch("https://jsonplaceholder.typicode.com/posts/" + id + "/comments")
    const commentsData = await commentsRes.json();

    return {
        props: { post: idData,
                 comments: commentsData}
    }
}

function PostDetails({ post, comments }) {
    const [avatars, setAvatars] = useState([]);

    useEffect(() => {
        const fetchAvatars = async () => {
          try {
            const response = await fetch('https://randomuser.me/api/?results=5');
            const data = await response.json();
            setAvatars(data.results);
          } catch (error) {
            console.error('Error fetching avatars:', error);
          }
        };
    
        fetchAvatars();
      }, []);


    const comment = comments.map((comment, index) => (
        <div key={comment.id} className={`mb-8 ${index !== 0 ? 'border-t border-gray-300 pt-4' : ''}`}>
          <div className="flex items-start">
            <img
              className="rounded-full shadow-1-strong me-3"
              src={avatars.length > 0 ? avatars[index % avatars.length].picture.large : ''}
              alt="avatar"
              width="60"
              height="60"
            />
            <div>
              <h6 className="font-bold mb-1 text-black">{comment.name}</h6>
              <p className="text-black mb-1">{comment.email}</p>
              <div className="flex items-center mb-3">
                <span className="font-light text-gray-600">Nov. 13, 2023</span>
              </div>
              <p className="text-black mb-0">{comment.body}</p>
            </div>
          </div>
        </div>
      ));
    
    return (
       <main>
        <div className="container w-100 lg:w-4/5 mx-auto flex flex-col items-center justify-center">
         <div className="max-w-4xl px-10 my-4 py-6 bg-white rounded-lg" >
          <div className="flex justify-between items-center">
              <span className="font-light text-gray-600">Nov. 13, 2023</span>
              <h3 className="px-2 py-1 bg-gray-600 text-gray-100 font-bold rounded hover:bg-gray-500">Post</h3>
          </div>
          <div className="mt-2">
              <h1 className="text-2xl text-gray-700 font-bold hover:text-gray-600" >{post.title}</h1>
              <p className="mt-2 text-gray-600">{post.body}</p>
          </div>
          <div className="flex justify-end items-center mt-4">
              <div>
                  <article className="flex items-center">
                      <img className="mx-4 w-10 h-10 object-cover rounded-full hidden sm:block" src="https://avatars.githubusercontent.com/u/69429801?s=400&u=238d502e896c5d8ed3c25dea8b1d159e090d4395&v=4" alt="avatar" />
                      <h1 className="text-gray-700 font-bold">Ramah Madi</h1>
                  </article>
              </div>
          </div>
        </div>
     

     {/* Comment section */}
     <section className="bg-white mt-4 max-w-4xl px-10 my-2 py-4 bg-white rounded-lg">
          <div className="container my-5 py-5">
            <div className="row justify-center">
              <div className="col-md-12 col-lg-10">
                <div className="card text-dark rounded-md">
                  <div className="card-body p-4">
                    <h4 className="text-black mb-2 text-2xl font-semibold">Recent comments</h4>
                    <p className="font-light text-black mb-4 pb-2">
                      Latest Comments section by users
                    </p>
                    {comment}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        </div>
                  
  </main>
    
    )
   
}

export default PostDetails