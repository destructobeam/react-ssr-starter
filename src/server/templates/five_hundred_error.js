const object_to_html = obj =>
  Object.entries(obj)
    .map(([key, value]) => {
      console.log('Object entry:', { key, value });

      switch (typeof value) {
        case 'string':
          console.log(`${key} is string`);

          return `<li>${key}</li><ul><li>${value}</li></ul>`;
        case 'object':
          console.log(`${key} is object`);

          return `
            <li>${key}</li>
            ${object_to_html(value)}
          `;
        default:
          console.log('case not matched', typeof value);

          return '';
      }
    })
    .join('\n');

const five_hundred_error = (error, status) =>
  IS_DEV && error
    ? `
  <div style="font-family: monospace">
    <h2>Error: ${error.code}</h2>
    <p>${error.message}</p>
    <p>${error.stack}</p>
  </div>
`
    : `
  <p>Some help text</p>
`;

export default five_hundred_error;
