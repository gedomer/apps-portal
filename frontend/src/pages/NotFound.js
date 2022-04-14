import React from 'react'

function NotFound(props) {
  React.useEffect(() => {
    document.title = "Not Found";
  });

  return (
    <div>NotFound</div>
  )
}

export default NotFound