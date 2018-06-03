import React from 'react'
import { Link } from 'react-router-dom';

class Home extends React.Component {

  render() {
    const iconStyle = {
      height: "30px",
      fontSize: "1.5em",
      color: "white"
    };
    return (
      <div className="bg-blue flex lg:mt-4 p-2 rounded-t">
        <div>
          <i className='fa fa-home fa-3' style={iconStyle} alt="" />
        </div>
        <div className="mt-1 ml-2">
          <a className="text-white no-underline" href="https://my-dev-space.com">
            My Developer Space
               </a>
        </div>
        <ul className="list-reset flex flex-wrap mt-1 ml-4">
          <li className="mr-6">
            <Link to='/latest' className='text-grey-light hover:text-white'>latest</Link>
          </li>
          <li className="mr-6">
            <Link to='/event' className='text-grey-light hover:text-white'>events</Link>
          </li>
          <li className="mr-6">
            <Link to='/project' className='text-grey-light hover:text-white'>projects</Link>
          </li>
          <li className="mr-6">
            <Link to='/speaker' className='text-grey-light hover:text-white'>speakers</Link>
          </li>
          <li className="mr-6">
            <Link to='/developer' className='text-grey-light hover:text-white'>developers</Link>
          </li>
        </ul>
      </div>
    )
  }
}

export default Home;
