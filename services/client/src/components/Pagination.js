import React from 'react'

class Pagination extends React.Component {

  render() {
    return (
      <div className="bg-white border border-grey-lightest p-2 shadow-light">
        <div className="container mx-auto">
          <div className="flex items-center">
            <span className="rounded-l rounded-sm border border-brand-light px-3 py-2 cursor-not-allowed no-underline">&laquo;</span>
            <span className="border-t border-b border-l border-brand-light px-3 py-2 bg-brand-light no-underline">1</span>
            <a className="border-t border-b border-l border-brand-light px-3 py-2 hover:bg-brand-light text-brand-dark no-underline" href="https://laracrunch.com?category=latest&amp;page=2">2</a>
            <a className="border-t border-b border-l border-brand-light px-3 py-2 hover:bg-brand-light text-brand-dark no-underline" href="https://laracrunch.com?category=latest&amp;page=3">3</a>
            <a className="border-t border-b border-l border-brand-light px-3 py-2 hover:bg-brand-light text-brand-dark no-underline" href="https://laracrunch.com?category=latest&amp;page=4">4</a>
            <a className="border-t border-b border-l border-brand-light px-3 py-2 hover:bg-brand-light text-brand-dark no-underline" href="https://laracrunch.com?category=latest&amp;page=5">5</a>
            <a className="border-t border-b border-l border-brand-light px-3 py-2 hover:bg-brand-light text-brand-dark no-underline" href="https://laracrunch.com?category=latest&amp;page=6">6</a>
            <a className="border-t border-b border-l border-brand-light px-3 py-2 hover:bg-brand-light text-brand-dark no-underline" href="https://laracrunch.com?category=latest&amp;page=7">7</a>
            <a className="border-t border-b border-l border-brand-light px-3 py-2 hover:bg-brand-light text-brand-dark no-underline" href="https://laracrunch.com?category=latest&amp;page=8">8</a>
            <span className="border-t border-b border-l border-brand-light px-3 py-2 cursor-not-allowed no-underline">...</span>
            <a className="border-t border-b border-l border-brand-light px-3 py-2 hover:bg-brand-light text-brand-dark no-underline" href="https://laracrunch.com?category=latest&amp;page=55">55</a>
            <a className="border-t border-b border-l border-brand-light px-3 py-2 hover:bg-brand-light text-brand-dark no-underline" href="https://laracrunch.com?category=latest&amp;page=56">56</a>
            <a className="rounded-r rounded-sm border border-brand-light px-3 py-2 hover:bg-brand-light text-brand-dark no-underline" href="https://laracrunch.com?category=latest&amp;page=2" rel="next">&raquo;</a>
          </div>
        </div>
      </div>
    )
  }
}

export default Pagination;
