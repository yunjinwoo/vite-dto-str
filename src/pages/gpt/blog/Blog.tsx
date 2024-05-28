// src/pages/Blog.tsx
import React from "react";
import ReactMarkdown from "react-markdown";
import LayoutGPT from "../../../widgets/gpt/LayoutGPT";

const posts = [
  {
    title: "First Post",
    content: "# First Post\nThis is the first post content.",
  },
  {
    title: "Second Post",
    content: "# Second Post\nThis is the second post content.",
  },
];

const Blog: React.FC = () => {
  return (
    <LayoutGPT>
      <div>
        <h1>Blog</h1>
        {posts.map((post, index) => (
          <div key={index}>
            <h2>{post.title}</h2>
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        ))}
      </div>
    </LayoutGPT>
  );
};

export default Blog;
