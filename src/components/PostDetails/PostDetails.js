import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import parse from 'html-react-parser';
import './PostDetails.css';
import postService from '../../services/postService';
import CommentSection from '../CommentSection/CommentSection';
import AsideSection from './AsideSection/AsideSection';

function PostDetails() {
  const { postId } = useParams();
  const [post, setPost] = useState({
    isLoading: true,
  });

  useEffect(() => {
    postService
      .getPostById(postId)
      .then((receivedPost) => setPost({ ...receivedPost, isLoading: false }));

    return () => {
      setPost({
        isLoading: true,
      });
    };
  }, [postId]);

  if (post.isLoading) {
    return (
      <div className='page-section pt-5'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-8'>
              <div className='blog-single-wrap'>
                <div className='header'>
                  <div className='post-thumb skeleton'>
                    <img className='skeleton' src={post.imageUrl} alt='' />
                  </div>
                  <div className='meta-header'>
                    <div className='post-author'>
                      <div className='avatar'>
                        <img className='skeleton' src={post.imageUrl} alt='' />
                      </div>
                    </div>
                  </div>
                </div>
                <div className='post-title skeleton skeleton-heading'></div>
                <div className='post-meta'>
                  <div className='post-date'>
                    <span className='icon'>
                      <span className='mai-time-outline'></span>
                    </span>
                    yyyy-mm-dd
                  </div>
                  <div className='post-comment-count ml-2'>
                    <span className='icon'>
                      <span className='mai-chatbubbles-outline'></span>
                    </span>{' '}
                    Comments
                  </div>
                </div>
                <div className='post-content'>
                  <div className='skeleton skeleton-text'></div>
                  <div className='skeleton skeleton-text'></div>
                  <div className='skeleton skeleton-text'></div>
                  <div className='skeleton skeleton-text'></div>
                  <div className='skeleton skeleton-text'></div>
                  <div className='skeleton skeleton-text'></div>
                  <div className='skeleton skeleton-text'></div>
                </div>
              </div>
            </div>
            <AsideSection postId={postId} categories={null} />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className='page-section pt-5'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-8'>
              <div className='blog-single-wrap'>
                <div className='header'>
                  <div className='post-thumb'>
                    <img src={post.imageUrl} alt='' />
                  </div>
                  <div className='meta-header'>
                    <div className='post-author'>
                      <div className='avatar'>
                        <img src={post.author?.avatar} alt='' />
                      </div>
                      <a href='/'>
                        {post.author?.firstName} {post.author?.lastName}
                      </a>
                    </div>
                  </div>
                </div>
                <h1 className='post-title'>{post.title}</h1>
                <div className='post-meta'>
                  <div className='post-date'>
                    <span className='icon'>
                      <span className='mai-time-outline'></span>
                    </span>{' '}
                    {post.dateOfCreation.substring(0, 10)}
                  </div>
                  <div className='post-comment-count ml-2'>
                    <span className='icon'>
                      <span className='mai-chatbubbles-outline'></span>
                    </span>{' '}
                    {post.comments.length} Comments
                  </div>
                </div>
                <div className='post-content'>
                  <p>{parse(post.description)}</p>
                </div>
              </div>

              <CommentSection postId={postId} comments={post.comments} />
            </div>
            <AsideSection postId={postId} categories={post.categories} />
          </div>
        </div>
      </div>
    );
  }
}

export default PostDetails;
