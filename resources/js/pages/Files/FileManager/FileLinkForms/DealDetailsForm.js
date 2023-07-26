import React from 'react';

import assets from '../../../../assets';

const DealDetailsForm = (props) => {
  const { room, download } = props
  return (
    <form action="/dealdetails" method="post" target={download===false ? '_blank' : ''}>
      <input type="hidden" name="_token" value={$('meta[name="csrf-token"]').attr('content')}/>
      <input type="hidden" name="rid" value={room.rid}/>
      <input type="hidden" name="download" value={download}/>
      <button type="submit" className="button-transparent">
        {props.children}
      </button>
    </form>
  )
}

export default DealDetailsForm;
