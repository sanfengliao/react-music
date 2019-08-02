import React from 'react'
import NoResult from '../../components/no-result/NoResult';
import SearchBox from '../../components/search-box/SearchBox';
import SearchList from '../../components/search-list/SearchList.jsx'

class Rank extends React.Component {
  render() {
    return (
      <div className="">
        <NoResult />
        <SearchBox onQueryChange={query => console.log(query)}/>
        <SearchList searches={[1, 2]} />
      </div>
    )
  }
}

export default Rank