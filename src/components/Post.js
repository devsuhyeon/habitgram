import React, { useState } from 'react';
import { CgProfile } from 'react-icons/cg';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import { MdDelete } from 'react-icons/md';
import ReportForm from './ReportForm';

const Post = ({ userObj, post }) => {
  const [reporting, setReporting] = useState(false);

  const onReportClick = () => {
    setReporting(true);
  };

  const onReportCancel = (event) => {
    event.preventDefault();
    setReporting(false);
  };

  const onReportSubmit = () => {
    setReporting(false);
  };

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
      <button onClick={onReportClick}>Report</button>
      {reporting && (
        <ReportForm
          userObj={userObj}
          post={post}
          onReportCancel={onReportCancel}
          onReportSubmit={onReportSubmit}
        />
      )}
    </div>
  );
};

export default Post;
