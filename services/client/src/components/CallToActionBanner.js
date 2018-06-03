import React from 'react'

class CallToActionBanner extends React.Component {

  render() {
    return (
      <div className="bg-grey-lightest border border-grey-lightest p-4 shadow-light text-center text-sm">
        What else would you like seen here? <a className="text-blue" href="https://github.com/apoclyps/my-dev-space/issues" target="_blank"  rel="noopener noreferrer">Make a request</a>
      </div>
    )
  }
}

export default CallToActionBanner;
