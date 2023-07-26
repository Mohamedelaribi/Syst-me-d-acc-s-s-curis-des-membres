import React from 'react';

import assets from '../../../../assets';
import * as functions from '../../../../functions';

const KYCPDFForm = (props) => {
  const { room, user, download } = props
  return (
    <form action="/kyc" method="post" target={download===false ? '_blank' : ''}>
      <input type="hidden" name="_token" value={$('meta[name="csrf-token"]').attr('content')}/>
      <input type="hidden" name="rid" value={room.rid}/>
      <input type="hidden" name="uid" value={user.uid}/>
      <button type="submit" className="button-transparent">
        {props.children}
      </button>
    </form>
  )
}

export default KYCPDFForm;
