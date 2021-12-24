import './Catalog.css';
import PostCard from '../PostCard/PostCard';

function Catalog() {
  return (
    <div className='page-section'>
      <div className='container'>
        <div className='row'>
          <div className='col-sm-10'>
            <form action='#' className='form-search-blog'>
              <div className='input-group'>
                <div className='input-group-prepend'>
                  <select id='categories' className='custom-select bg-light'>
                    <option>All Categories</option>
                    <option value='travel'>Travel</option>
                    <option value='lifestyle'>LifeStyle</option>
                    <option value='healthy'>Healthy</option>
                    <option value='food'>Food</option>
                  </select>
                </div>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Enter keyword..'
                />
              </div>
            </form>
          </div>
          <div className='col-sm-2 text-sm-right'>
            <button className='btn btn-secondary'>
              Filter <span className='mai-filter'></span>
            </button>
          </div>
        </div>

        <div className='row my-5'>
          {
            //<PostCard />
          }
        </div>

        <nav aria-label='Page Navigation'>
          <ul className='pagination justify-content-center'>
            <li className='page-item disabled'>
              <a
                className='page-link'
                href='#'
                tabIndex='-1'
                aria-disabled='true'>
                Previous
              </a>
            </li>
            <li className='page-item'>
              <a className='page-link' href='#'>
                1
              </a>
            </li>
            <li className='page-item active' aria-current='page'>
              <a className='page-link' href='#'>
                2 <span className='sr-only'>(current)</span>
              </a>
            </li>
            <li className='page-item'>
              <a className='page-link' href='#'>
                3
              </a>
            </li>
            <li className='page-item'>
              <a className='page-link' href='#'>
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Catalog;
