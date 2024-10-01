"use client";
import { useState, useEffect } from "react";
import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/outline"; // Ensure correct version of heroicons
import { LucideShare, Share2 } from "lucide-react";

const Forums = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");

  // Placeholder posts to simulate already shared financial advice
  const placeholderPosts = [
    {
      content:
        "I started tracking my expenses using a simple spreadsheet and budgeting apps like PeraPinoy!, and it's helped me save 20% of my income monthly.",
      date: new Date("2024-09-15T14:30:00"),
      votes: 12,
    },
    {
      content:
        "Investing in stocks is great, but remember to diversify! I lost some money by putting all my savings in one company.",
      date: new Date("2023-09-12T08:45:00"),
      votes: 8,
    },
    {
      content:
        "Make sure to build an emergency fund before investing! It saved me during the pandemic.",
      date: new Date("2023-09-10T11:20:00"),
      votes: 25,
    },
  ];

  // Load placeholder posts when the component mounts
  useEffect(() => {
    setPosts(placeholderPosts);
  }, []);

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (newPost.trim()) {
      setPosts([{ content: newPost, date: new Date(), votes: 0 }, ...posts]);
      setNewPost("");
    }
  };

  const handleUpvote = (index) => {
    const updatedPosts = [...posts];
    updatedPosts[index].votes += 1;
    setPosts(updatedPosts);
  };

  const handleDownvote = (index) => {
    const updatedPosts = [...posts];
    updatedPosts[index].votes -= 1;
    setPosts(updatedPosts);
  };

  return (
    <div className=" mx-auto p-8 bg-gray-50 shadow-lg rounded-lg">
      {/* Header */}
      <h1 className="text-2xl md:text-4xl lg:text-4xl font-bold text-orange mb-8">
        Share Your Financial Experiences & Tips
      </h1>

      {/* Post Form */}
      <form onSubmit={handlePostSubmit} className="mb-10">
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange resize-none shadow-md bg-white text-gray-700"
          placeholder="What's your advice or experience?"
        />
        <button
          type="submit"
          className="mt-4 w-full flex justify-center gap-2 bg-orange text-white font-semibold py-3 rounded-2xl shadow-lg hover:bg-secondary transition duration-300"
        >
          Share Your Post
          <Share2 />
        </button>
      </form>

      {/* Display Posts */}
      <div className="space-y-8">
        {posts.length > 0 ? (
          posts.map((post, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex gap-4 hover:shadow-lg transition-shadow duration-300"
            >
              {/* Voting Section */}
              <div className="flex flex-col items-center gap-2">
                <button
                  onClick={() => handleUpvote(index)}
                  className="p-2 rounded-full hover:bg-gray-100 transition duration-150"
                >
                  <ArrowUpIcon className="h-6 w-6 text-gray-500 hover:text-orange-500" />
                </button>
                <span className="text-lg font-semibold text-gray-800">
                  {post.votes}
                </span>
                <button
                  onClick={() => handleDownvote(index)}
                  className="p-2 rounded-full hover:bg-gray-100 transition duration-150"
                >
                  <ArrowDownIcon className="h-6 w-6 text-gray-500 hover:text-blue-500" />
                </button>
              </div>

              {/* Post Content */}
              <div className="flex-grow">
                <p className="text-gray-800 text-lg font-medium mb-2">
                  {post.content}
                </p>
                <span className="text-sm text-gray-500">
                  Posted on {post.date.toLocaleString()}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-16 bg-white rounded-lg shadow-md border border-gray-200">
            <p className="text-lg font-semibold text-gray-500">
              No posts yet.
            </p>
            <p className="text-gray-400">
              Be the first to share your financial advice or experience!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Forums;

