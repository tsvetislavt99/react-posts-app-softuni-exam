import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './PostDetails.css';
import postService from '../../services/postService';
import CommentSection from '../CommentSection/CommentSection';
import AsideSection from './AsideSection/AsideSection';

function PostDetails() {
  const { postId } = useParams();

  const [post, setPost] = useState({ isLoading: true });

  useEffect(() => {
    setTimeout(() => {
      postService
        .getPostById(postId)
        .then((receivedPost) => setPost({ ...receivedPost, isLoading: false }));
    }, 5000);
  }, []);

  console.log(post);

  const { author } = post;

  if (post.isLoading) {
    return (
      <div className='page-section pt-5'>
        <div className='container'>
          <nav aria-label='Breadcrumb'>
            <ul className='breadcrumb p-0 mb-0 bg-transparent'>
              <li className='breadcrumb-item'>
                <a href='index.html'>Home</a>
              </li>
              <li className='breadcrumb-item'>
                <a href='blog.html'>Blog</a>
              </li>
              <li className='breadcrumb-item active'></li>
            </ul>
          </nav>

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

                    <div className='post-sharer'>
                      <a href='#' className='btn social-facebook'>
                        <span className='mai-logo-facebook-f'></span>
                      </a>
                      <a href='#' className='btn social-twitter'>
                        <span className='mai-logo-twitter'></span>
                      </a>
                      <a href='#' className='btn social-linkedin'>
                        <span className='mai-logo-linkedin'></span>
                      </a>
                      <a href='#' className='btn'>
                        <span className='mai-mail'></span>
                      </a>
                    </div>
                  </div>
                </div>
                <div className='post-title skeleton skeleton-heading'></div>
                <div className='post-meta'>
                  <div className='post-date'>
                    <span className='icon'>
                      <span className='mai-time-outline'></span>
                    </span>
                    <a href='#'>dd/mm/yyyy</a>
                  </div>
                  <div className='post-comment-count ml-2'>
                    <span className='icon'>
                      <span className='mai-chatbubbles-outline'></span>
                    </span>{' '}
                    <a href='#'>Comments</a>
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

              <CommentSection />
            </div>
            <AsideSection postId={null} />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className='page-section pt-5'>
        <div className='container'>
          <nav aria-label='Breadcrumb'>
            <ul className='breadcrumb p-0 mb-0 bg-transparent'>
              <li className='breadcrumb-item'>
                <a href='index.html'>Home</a>
              </li>
              <li className='breadcrumb-item'>
                <a href='blog.html'>Blog</a>
              </li>
              <li className='breadcrumb-item active'>{post.title}</li>
            </ul>
          </nav>

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
                        <img src='../assets/img/person/person_1.jpg' alt='' />
                      </div>
                      <a href='/'>
                        {post.author?.firstName} {post.author?.lastName}
                      </a>
                    </div>

                    <div className='post-sharer'>
                      <a href='#' className='btn social-facebook'>
                        <span className='mai-logo-facebook-f'></span>
                      </a>
                      <a href='#' className='btn social-twitter'>
                        <span className='mai-logo-twitter'></span>
                      </a>
                      <a href='#' className='btn social-linkedin'>
                        <span className='mai-logo-linkedin'></span>
                      </a>
                      <a href='#' className='btn'>
                        <span className='mai-mail'></span>
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
                    <a href='#'>{post.dataOfCreation}</a>
                  </div>
                  <div className='post-comment-count ml-2'>
                    <span className='icon'>
                      <span className='mai-chatbubbles-outline'></span>
                    </span>{' '}
                    <a href='#'>4 Comments</a>
                  </div>
                </div>
                <div className='post-content'>
                  <p>{post.description}</p>
                  <blockquote className='quote'>
                    “I'm selfish, impatient and a little insecure. I make
                    mistakes, I am out of control and at times hard to handle.
                    But if you can't handle me at my worst, then you sure as
                    hell don't deserve me at my best.”
                    <span className='author'>― Marilyn Monroe</span>
                  </blockquote>
                </div>
              </div>

              <CommentSection />
            </div>
            <AsideSection postId={post._id} />
          </div>
        </div>
      </div>
    );
  }
}

export default PostDetails;
