import Link from "next/link";
import React from "react"


export const getStaticProps = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await res.json();

    return {
        props: { posts: data }
    }
}


function Posts({ posts }){

    return (
      <div className="container w-100 lg:w-4/5 mx-auto flex flex-col items-center justify-center">
      {posts.map((post) => (
         <div key={post.id} className="max-w-4xl px-10 my-4 py-6 bg-white rounded-lg" >
          <div className="flex justify-between items-center">
              <span className="font-light text-gray-600">Nov. 13, 2023</span>
              <Link className="px-2 py-1 bg-gray-600 text-gray-100 font-bold rounded hover:bg-gray-500" href={`/posts/${post.id}`}>Post</Link>
          </div>
          <div className="mt-2">
              <Link className="text-2xl text-gray-700 font-bold hover:text-gray-600" href={`/posts/${post.id}`}>{post.title}</Link>
              <p className="mt-2 text-gray-600">{post.body}...</p>
          </div>
          <div className="flex justify-between items-center mt-4">
              <Link className="text-blue-600 hover:underline" href={`/posts/${post.id}`}>Read more</Link>
              <div>
                  <a className="flex items-center" href="https://github.com/ramah-madi">
                      <img className="mx-4 w-10 h-10 object-cover rounded-full hidden sm:block" src="https://avatars.githubusercontent.com/u/69429801?s=400&u=238d502e896c5d8ed3c25dea8b1d159e090d4395&v=4" alt="avatar" />
                      <h1 className="text-gray-700 font-bold">Ramah Madi</h1>
                  </a>
              </div>
          </div>
      </div>
  
      ))}
     </div>
    )
}

export default Posts