import { element } from 'deku';

function inputFactory (name, type) {
  return {
    name,
    render: c => <input type={type} class={c.props.class} style={c.props.style} />
  };
}

let types = [
  'Button',
  'Checkbox',
  'Color',
  'Date',
  'Datetime',
  'Email',
  'Local',
  'Month',
  'Number',
  'Password',
  'Radio',
  'Range',
  'Search',
  'Submit',
  'Tel',
  'Text',
  'Time',
  'Url',
  'Week'];

let fields = {};
for (let t of types) {
  fields[t] = inputFactory(t, t.toLowerCase())
}

export default fields;
