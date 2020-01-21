import React from 'react'
import {Pagination} from 'semantic-ui-react'

const Paginate = props => {
  const handlePaginationChange = (e, {activePage}) => {
    props.setPage(activePage)
  }

  return (
    <Pagination
      className="paginate"
      defaultActivePage={1}
      totalPages={Math.floor(props.count / props.limit) || 1}
      onPageChange={handlePaginationChange}
      firstItem={null}
      lastItem={null}
      pointing
      secondary
    />
  )
}

export default Paginate
