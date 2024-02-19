import React from 'react';
import PatchEvent, { set, unset } from 'part:@sanity/form-builder/patch-event';

function createPatchFrom(value) {
  return PatchEvent.from(value === '' ? unset() : set(Number(value)));
}

const formatMoney = Intl.NumberFormat('en-CA', {
  style: 'currency',
  currency: 'CAD',
}).format;

export default function PriceInput({
  type,
  value,
  onChange,
  markers,
  inputComponent,
}) {
  const validationError = markers.find(
    (marker) => marker.type === 'validation' && marker.level === 'error'
  );

  return (
    <div>
      <h2>
        {type.title} - {value ? formatMoney(value / 100) : ''}
      </h2>
      <p>{type.description}</p>
      <input
        type={type.name}
        value={value}
        onChange={(event) => onChange(createPatchFrom(event.target.value))}
        ref={inputComponent}
      />
      {validationError && <p style={{ color: 'red' }}>{validationError.item.message}</p>}
    </div>
  );
}

PriceInput.focus = function () {
  this._inputElement.focus();
};
