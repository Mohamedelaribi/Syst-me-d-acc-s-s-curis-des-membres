import React from 'react';

import assets from '../../../../assets';

const DocumentLinkForm = (props) => {
  const { type, url, download } = props
  return (
    <form action="/file" method="post" target={download===false ? '_blank' : ''}>
      <input type="hidden" name="_token" value={$('meta[name="csrf-token"]').attr('content')}/>
      <input type="hidden" name="type" value={type}/>
      <input type="hidden" name="url" value={url}/>
      <input type="hidden" name="download" value={download}/>
      <button type="submit" className="button-transparent">
        {props.children}
      </button>
    </form>
  )
}

export default DocumentLinkForm;
