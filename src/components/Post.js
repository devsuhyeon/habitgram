import React from 'react';
import { CgProfile } from 'react-icons/cg';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import { MdDelete } from 'react-icons/md';

const Post = ({ post }) => {
  return (
    <div>
      <div>
        <div>
          <CgProfile />
          <div>
            <span>{post.displayName}</span>
            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
        <div>
          <button>
            <HiOutlinePencilAlt />
          </button>
          <button>
            <MdDelete />
          </button>
        </div>
      </div>
      <img src={post.previewUrl} alt="picture" />
      <span>{post.comment}</span>
      <button>Report</button>
    </div>
  );
};

export default Post;
